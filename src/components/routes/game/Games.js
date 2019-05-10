import React from "react";
import Game from "./Game";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const styles = theme => ({
  card: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.primary[200]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.secondary[50]
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
    games && games.length > 0 ? (
      games.map(game => (
        <div className={classes.card} key={game.id}>
          <Game game={game} team={team} user={user} />
        </div>
      ))
    ) : (
      <div className={classes.card}>
        <Typography variant="h6">No Games Added</Typography>
        <Typography variant="subtitle1">Add Game Below</Typography>
      </div>
    );

  return <div className="Games">{myGames}</div>;
};

export default withStyles(styles)(Games);
