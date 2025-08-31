import React, { useState } from 'react';

interface LobbySelectorProps {
  onLobbyCreated: (lobbyType: 'public' | 'private', playerName: string) => void;
}

export const LobbySelector: React.FC<LobbySelectorProps> = ({ onLobbyCreated }) => {
  const [lobbyType, setLobbyType] = useState<'public' | 'private' | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleLobbyTypeSelect = (type: 'public' | 'private') => {
    setLobbyType(type);
    setShowNameInput(true);
  };

  const handleSubmit = () => {
    if (playerName.trim() && lobbyType) {
      onLobbyCreated(lobbyType, playerName.trim());
    }
  };

  const handleBack = () => {
    setLobbyType(null);
    setShowNameInput(false);
    setPlayerName('');
  };

  if (!showNameInput) {
    return (
      <div className="lobby-selector">
        <h2>Select Lobby Type</h2>
        <div className="lobby-buttons">
          <button 
            className="lobby-btn public"
            onClick={() => handleLobbyTypeSelect('public')}
          >
            🌍 Public Lobby
          </button>
          <button 
            className="lobby-btn private"
            onClick={() => handleLobbyTypeSelect('private')}
          >
            🔒 Private Lobby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lobby-selector">
      <h2>Enter Your Name</h2>
      <p className="lobby-type-display">
        {lobbyType === 'public' ? '🌍 Public Lobby' : '🔒 Private Lobby'}
      </p>
      <div className="name-input-container">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name..."
          className="name-input"
          maxLength={20}
        />
        <div className="button-group">
          <button 
            className="btn btn-secondary"
            onClick={handleBack}
          >
            ← Back
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!playerName.trim()}
          >
            Create Lobby
          </button>
        </div>
      </div>
    </div>
  );
};
