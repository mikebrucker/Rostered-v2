import React from "react";
import Game from "./Game";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.background.game
    },
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.background.paper
    }
  }
});

const Games = ({ user, team, schedule, classes }) => {
  const games =
    user && user.games
      ? user.games
          .filter(game => game.scheduleId === schedule.id)
          .sort(
            (a, b) =>
              new Date(a.dateTime.seconds * 1000) -
              new Date(b.dateTime.seconds * 1000)
          )
      : null;

  const myGames =
    games && games.length > 0
      ? games.map(game => (
          <div className={classes.card} key={game.id}>
            <Game game={game} team={team} user={user} />
          </div>
        ))
      : "No Games Added Yet";

  return <div className="Games">{myGames}</div>;
};

export default withStyles(styles)(Games);
