import React, { useState } from "react";
import GameDate from "../utils/GameDate";
import DeleteItem from "../utils/DeleteItem";
import Loading from "../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  game: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  gameInfo: {
    display: "inline-block",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actions: {
    display: "flex"
  }
  // title: {
  //   display: "flex"
  // }
  // Add results in future with expand button like schedule has
  // expand: {
  //   transform: "rotate(0deg)",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest
  //   })
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)"
  // }
});

const Game = ({ game, team, user, classes }) => {
  const [showActions, setshowActions] = useState(false);

  const score =
    game && game.myScore && game.enemyScore
      ? ` ${game.myScore} - ${game.enemyScore} `
      : " vs ";

  if (game) {
    return (
      <div className={`Game ${classes.game}`}>
        <div
          className={classes.title}
          onClick={() => setshowActions(!showActions)}
        >
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid xs={5} item>
              <Typography variant="h6">{team.teamName}</Typography>
            </Grid>
            <Grid xs={2} item>
              <Typography variant="h6" color="textSecondary">
                {score}
              </Typography>
            </Grid>
            <Grid xs={5} item>
              <Typography variant="h6">{game.opponent}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" color="textSecondary">
            <GameDate date={new Date(game.dateTime.seconds * 1000)} />
          </Typography>
        </div>
        <Collapse in={showActions}>
          <Typography classes={{ root: classes.gameInfo }} variant="body2">
            Division: {team.division}
          </Typography>
          <Typography classes={{ root: classes.gameInfo }} variant="body2">
            Location: {team.arena}
          </Typography>
          <CardActions className={classes.actions}>
            <DeleteItem user={user} item={game} />
          </CardActions>
        </Collapse>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default withStyles(styles)(Game);
