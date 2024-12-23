import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { createChartOptions } from './utils/chartOptions';
import { buttonStyle, bitcoinBoxStyle } from './utils/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import io from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const App: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [new Date().toISOString()],
    datasets: [
      {
        label: 'Value',
        data: [Math.floor(Math.random() * 100)],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  });

  const [yAxisLimits, setYAxisLimits] = useState({ min: 0, max: 100 });
  const [socket, setSocket] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000/data', {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleToggleSubscription = () => {
    if (socket) {
      if (isSubscribed) {
        socket.emit('unsubscribeRandomNumber');
        socket.off('randomNumber');
        setIsSubscribed(false);
      } else {
        socket.emit('subscribeRandomNumber');
        socket.on('randomNumber', (randomNumber: number) => {
          setChartData((prevData) => {
            const newMin = Math.min(...prevData.datasets[0].data, randomNumber) - 10;
            const newMax = Math.max(...prevData.datasets[0].data, randomNumber) + 10;
            setYAxisLimits({ min: newMin, max: newMax });

            return {
              labels: [...prevData.labels, new Date().toISOString()],
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [...prevData.datasets[0].data, randomNumber],
                },
              ],
            };
          });
        });
        setIsSubscribed(true);
      }
    }
  };

  // Subscribe to Bitcoin price
  useEffect(() => {
    if (socket) {
      socket.emit('subscribeBitcoinPrice');
      socket.on('bitcoinPrice', (price: number) => {
        setBitcoinPrice(price);
      });

      return () => {
        socket.emit('unsubscribeBitcoinPrice');
        socket.off('bitcoinPrice');
      };
    }
  }, [socket]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Incoming Ticker Value of Price</h1>
      <button style={buttonStyle(isSubscribed)} onClick={handleToggleSubscription}>
        {isSubscribed ? 'Unsubscribe from Ticker' : 'Subscribe to Ticker'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <Line data={chartData} options={createChartOptions(yAxisLimits)} />
      </div>
      {bitcoinPrice !== null && (
        <div style={bitcoinBoxStyle}>
          Current Bitcoin Price: ${bitcoinPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default App;
