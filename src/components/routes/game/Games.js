import React from "react";
import Game from "./Game";
import "../../../scss/Games.scss";

const Games = ({ user, team, schedule }) => {
  const games =
    user && user.games
      ? user.games
          .filter(game => game.scheduleId === schedule.id)
          .sort(
            (a, b) =>
              new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
          )
      : null;

  const myGames = games
    ? games.map(game => (
        <Game key={game.id} game={game} team={team} user={user} />
      ))
    : "No Games Added Yet";

  return <div className="Games">{myGames}</div>;
};

export default Games;
