import React from 'react';
import './PlaylistOverlay.css';

const PlaylistOverlay = ({ playlist, onClose, onRemove }) => {
  return (
    <div className="playlist-overlay">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((song, index) => (
          <li key={index} className="playlist-item">
            {song.trackName} - {song.artistName}
            <button onClick={() => onRemove(song.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistOverlay;


