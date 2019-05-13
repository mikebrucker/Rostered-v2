import React from "react";
import Game from "./Game";
import AddGame from "./AddGame";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.secondary[50]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.primary[100]
    }
  }
});

const Games = ({ user, team, schedule, games, classes }) => {
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

  return (
    <div className="Games">
      {myGames}
      <AddGame
        classes={{ root: classes.card }}
        user={user}
        team={team}
        schedule={schedule}
      />
    </div>
  );
};

export default withStyles(styles)(Games);
