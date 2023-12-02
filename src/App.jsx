import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch data from your Express.js server
    axios.get('https://tgscraper.onrender.com/msg')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      
        
      
      <div className="messages">
        <h2>Telegram Messages</h2>
        {
          console.log(messages)
        }
        <ul>
          {messages.map(message => (
            <li key={message._id}>
              
              <strong>Content:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
     
    </div>
  );
}

export default App;
