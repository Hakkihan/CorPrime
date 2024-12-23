export const buttonStyle = (isSubscribed: boolean) => ({
    padding: '10px 20px',
    backgroundColor: isSubscribed ? 'rgb(192, 75, 75)' : 'rgb(75, 192, 192)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '20px 0',
  });
  
  export const bitcoinBoxStyle = {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    marginTop: '20px',
  };
  