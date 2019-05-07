import React from "react";
import Moment from "react-moment";
import DeleteItem from "../delete/DeleteItem";

const Game = ({ game, team, user }) => {
  if (game) {
    return (
      <div className="Game">
        <div>
          {team.teamName} vs {game.opponent}
        </div>
        <div>
          <Moment format="MMM Do, YYYY h:mm a">
            {game.dateTime.seconds * 1000}
          </Moment>
        </div>
        <DeleteItem user={user} item={game} />
      </div>
    );
  } else {
    return <div className="Game">Loading...</div>;
  }
};

export default Game;
