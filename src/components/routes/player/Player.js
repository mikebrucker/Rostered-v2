import React from "react";

const Player = ({ player }) => {
  if (player) {
    return (
      <div className="Player">
        <div>
          #{player.number} {player.firstName} {player.lastName}
        </div>
        <div>Position {player.position}</div>
        <div>
          {player.position === "G" ? "Catches" : "Shoots"} {player.shoots}
        </div>
      </div>
    );
  } else {
    return <div className="player">Loading...</div>;
  }
};

export default Player;
