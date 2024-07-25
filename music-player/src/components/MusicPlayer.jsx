import React, { useState, useRef } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="music-player">
      <div className="left-side">
        {currentSong && (
          <div className="song-info">
            <img src={currentSong.artworkUrl100} alt={`${currentSong.trackName} album cover`} className="album-cover" />
            <div className="song-details">
              <span className="song-name">{currentSong.trackName}</span>
              <span className="artist-name">{currentSong.artistName}</span>
            </div>
          </div>
        )}
      </div>
      <div className="center">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="right-side">
        {currentSong && (
          <div className="volume-control">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
            />
          </div>
        )}
      </div>
      <audio ref={audioRef} src={currentSong?.previewUrl}></audio>
    </div>
  );
};

export default MusicPlayer;
