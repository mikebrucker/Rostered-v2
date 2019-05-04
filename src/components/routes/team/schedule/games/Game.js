import React from "react";

const Game = ({ game }) => {
  if (game) {
    return (
      <div className="Game">
        <h3>{game.season} Season</h3>
        <div>{game.current ? "Current Season" : "Not Current Season"}</div>
      </div>
    );
  } else {
    return <div className="Game">Loading...</div>;
  }
};

export default Game;
