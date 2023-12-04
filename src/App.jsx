import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalMessages, setOriginalMessages] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState(['India', 'Government', 'Database']);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000; // Adjust this based on your needs

  useEffect(() => {
    axios.get('https://tgscraper.onrender.com/msg')
      .then(response => {
        setOriginalMessages(response.data);
        const filteredMessages = originalMessages.filter(message =>
          message.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMessages(filteredMessages);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [searchTerm]);

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  const messagesToDisplay = searchTerm !== '' ? messages : originalMessages;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const messagesSlice = messagesToDisplay.slice(startIndex, endIndex);

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="suggested-tags">
          {suggestedTags.map((tag, index) => (
            <span key={index} className="tag" onClick={() => handleTagClick(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="messages-container">
        <h2>Telegram Messages</h2>
        <ul className="message-list">
          {messagesSlice.map(message => (
            <li key={message._id} className='message-card'>
              {message.content.replace(/{|}/g, '').replace(/🔹 t.me\/breachdetector 🔹/g, '').replace(/['"]+/g, '').replace(/,/g, "    ||       ").trim()}
            </li>
          ))}
        </ul>
        {messagesToDisplay.length > itemsPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(messagesToDisplay.length / itemsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
