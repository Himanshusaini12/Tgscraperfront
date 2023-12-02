import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalMessages, setOriginalMessages] = useState([]);

  useEffect(() => {
    axios.get('https://tgscraper.onrender.com/msg')
      .then(response => {
        setOriginalMessages(response.data);
        const filteredMessages = response.data.filter(message =>
          message.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMessages(filteredMessages);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [searchTerm]);

  return (
    <div className="app-container">
      {/* <div className="search-container">
        <input
          type="text"
          placeholder="Search for content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      <div class="searchBox">

<input class="searchInput"type="text" name="" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
<button class="searchButton" href="#">
    <i class="material-icons">
        search
    </i>
</button>
</div>
      
      <div className="messages-container">
        <h2> ----------</h2>
        <ul className="message-list">
          {searchTerm !== '' ? (
            messages.map(message => (
              <li key={message._id}>
                <strong>Content:</strong> {message.content}
              </li>
            ))
          ) : (
            originalMessages.map(message => (
              <li key={message._id}>
                <strong>Content:</strong> {message.content}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
