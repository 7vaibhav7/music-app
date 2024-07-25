import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZKgvjS8IGCcCgJ53anQZhhqfAHvbGjVQRQ&usqp=CAU"
          alt="Spotify Logo"
          className="spotify-logo"
        />
        <h1 className="logo-text">Music Player</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs or artists"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default NavBar;