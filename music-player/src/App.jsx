import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import MusicPlayer from './components/MusicPlayer';
import PlaylistOverlay from './components/PlaylistOverlay';
import './App.css';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/songs');
      setSongs(response.data);
      setShowResults(true); 
    } catch (error) {
      console.error('Error fetching songs from iTunes API:', error);
    }
  };

  const addToPlaylist = (song) => {
    if (!playlist.find(item => item.trackId === song.trackId)) {
      setPlaylist([...playlist, song]);
    }
  };

  const playTrack = (song) => {
    const index = playlist.findIndex(item => item.trackId === song.trackId);
    if (index === -1) {
      addToPlaylist(song);
      setCurrentTrackIndex(playlist.length);
    } else {
      setCurrentTrackIndex(index);
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const stopTrack = () => {
    setCurrentTrackIndex(-1);
  };

  const removeFromPlaylist = (index) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
    
    if (currentTrackIndex === index) {
      stopTrack();
    } else if (currentTrackIndex > index) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  useEffect(() => {
    if (currentTrackIndex !== -1 && playlist[currentTrackIndex]) {
      const audio = document.getElementById('audio-player');
      audio.play().catch(error => console.error('Error playing audio:', error));
    }
  }, [currentTrackIndex, playlist]);

  const handleSearch = () => {
    searchSongs();
  };

  return (
    <div className="app">
      <NavBar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {showResults && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {songs.map((song) => (
              <li key={song.trackId} className="search-result-item">
                <img src={`http://localhost:3000${song.artworkUrl100}`} alt={song.trackName} />
                <div className="song-info">
                  <span>{song.trackName} by {song.artistName}</span>
                  <div className="song-actions">
                    <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
                    <button onClick={() => playTrack(song)}>Play</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentSong && (
        <MusicPlayer
          currentSong={currentSong}
          onAddToPlaylist={() => addToPlaylist(currentSong)}
        />
      )}
      {showPlaylist && (
        <PlaylistOverlay
          playlist={playlist}
          onClose={() => setShowPlaylist(false)}
          onRemove={removeFromPlaylist}
        />
      )}
      <button 
        onClick={() => setShowPlaylist(true)} 
        className="show-playlist-button">
        Show Playlist
      </button>
      {currentTrackIndex !== -1 && playlist[currentTrackIndex] && (
        <div className="player">
          <h2>Now Playing</h2>
          <audio id="audio-player" controls autoPlay src={`http://localhost:3000${playlist[currentTrackIndex].previewUrl}`}>
            Your browser does not support the audio element.
          </audio>
          <div className="player-controls">
            <button onClick={playPreviousTrack} disabled={currentTrackIndex === 0}>Previous</button>
            <button onClick={playNextTrack} disabled={currentTrackIndex === playlist.length - 1}>Next</button>
            <button onClick={stopTrack}>Stop</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
