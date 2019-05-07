import React from "react";
import DeleteItem from "../delete/DeleteItem";

const Player = ({ player, user }) => {
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
        <DeleteItem user={user} item={player} />
      </div>
    );
  } else {
    return <div className="player">Loading...</div>;
  }
};

export default Player;
