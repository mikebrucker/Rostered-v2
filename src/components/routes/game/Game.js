import React, { useState } from "react";
import GameDate from "../../utils/GameDate";
import Loading from "../../utils/Loading";
import Settings from "../../utils/Settings";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  game: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2
  },
  gameInfo: {
    display: "inline-block",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actions: {
    display: "flex"
  }
});

const Game = ({ game, team, user, classes }) => {
  const [showActions, setshowActions] = useState(false);

  const score =
    game && game.gameOver && game.myScore && game.enemyScore
      ? `${
          parseInt(game.myScore) === parseInt(game.enemyScore)
            ? "Tie"
            : parseInt(game.myScore) > parseInt(game.enemyScore)
            ? "W"
            : "L"
        } ${game.myScore} - ${game.enemyScore}`
      : null;

  const overtimeGame =
    game && game.gameOver
      ? game.shootOut
        ? "(SO)"
        : game.overTime
        ? "(OT)"
        : ""
      : "";

  const displayScore = score ? (
    <Typography variant="subtitle1">
      {score} {overtimeGame}
    </Typography>
  ) : null;

  if (game) {
    return (
      <div className="Game">
        <div onClick={() => setshowActions(!showActions)}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid xs={5} item>
              <Typography className={classes.game} variant="subtitle1">
                {game.teamName}
              </Typography>
            </Grid>
            <Grid xs={2} item>
              <Typography variant="subtitle1" color="textSecondary">
                vs
              </Typography>
            </Grid>
            <Grid xs={5} item>
              <Typography className={classes.game} variant="subtitle1">
                {game.opponent}
              </Typography>
            </Grid>
          </Grid>
          {displayScore}
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
          <Settings user={user} item={game} />
        </Collapse>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default withStyles(styles)(Game);
