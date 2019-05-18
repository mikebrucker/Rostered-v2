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
    game && game.myScore && game.enemyScore
      ? ` ${game.myScore} - ${game.enemyScore} `
      : " vs ";

  if (game) {
    return (
      <div className="Game">
        <div onClick={() => setshowActions(!showActions)}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid xs={5} item>
              <Typography className={classes.game} variant="subtitle1">
                {team.teamName}
              </Typography>
            </Grid>
            <Grid xs={2} item>
              <Typography variant="subtitle1" color="textSecondary">
                {score}
              </Typography>
            </Grid>
            <Grid xs={5} item>
              <Typography className={classes.game} variant="subtitle1">
                {game.opponent}
              </Typography>
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
          <Settings user={user} item={game} />
        </Collapse>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default withStyles(styles)(Game);
