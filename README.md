# CorPrime

This is a React application that demonstrates real-time data updates through WebSocket connections. It subscribes to two data streams: random numbers and Bitcoin prices. The app visualizes the random number stream in a line chart and displays the current Bitcoin price.

## Key Features
- **WebSocket Real-Time Updates**: The app connects to a WebSocket server and subscribes to two data streams.
  - **Random Number Stream**: Subscribes to a stream of random numbers.
  - **Bitcoin Price Stream**: Subscribes to live updates of Bitcoin prices.
- **Dynamic Charting**: Displays incoming data using `react-chartjs-2` in a line chart.
- **Interactive Buttons**: Allows users to subscribe/unsubscribe from data streams.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: A charting library for visualizing the data.
- **Socket.IO**: Enables real-time, bidirectional communication between the client and the server.
- **TypeScript**: Provides type safety and improved developer experience.

## Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager) or **yarn**

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
Install Dependencies: Navigate to the project directory and install dependencies:

npm install
npm run dev

Test the WebSocket Connection: Once the app is running, you should see a button to subscribe to real-time data streams and a chart that visualizes the random numbers. The current Bitcoin price will also be displayed below the chart.

How It Works
The app connects to a WebSocket server
The user can subscribe to the random number stream, which updates the chart with new values.
The user can also subscribe to the Bitcoin price stream, which updates the displayed Bitcoin price in real-time.
The user can toggle between subscribing and unsubscribing to these streams.
Dependencies
react-chartjs-2: For chart rendering.
chart.js: For creating interactive charts.
socket.io-client: For connecting to the WebSocket server.
chartjs-adapter-date-fns: For working with date formats in Chart.js.
Notes
The backend server should be running for the WebSocket connections to work. Ensure the backend is set up with a WebSocket server that emits randomNumber and bitcoinPrice events.
This app is intended for development and testing purposes and may need to be modified for production use, especially concerning WebSocket URLs and data handling.
