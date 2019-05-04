import React from "react";
import Game from "./Game";

const Games = ({ schedule }) => {
  const games =
    schedule && schedule.games && schedule.games.length > 0
      ? schedule.games.map(game => <Game key={game.id} game={game} />)
      : "No Games Added Yet";

  return <div className="Games">{games}</div>;
};

export default Games;
