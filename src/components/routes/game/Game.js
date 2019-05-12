import React, { useState } from "react";
import Moment from "react-moment";
import DeleteItem from "../utils/DeleteItem";
import Loading from "../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  gameInfo: {
    display: "inline-block",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actions: {
    display: "flex"
  }
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

  if (game) {
    return (
      <div className={`Game ${classes.game}`}>
        <div onClick={() => setshowActions(!showActions)}>
          <Typography variant="h6">
            {team.teamName} vs {game.opponent}
          </Typography>
          <Typography variant="subtitle1">
            <Moment format="dddd h:mma MMM Do, YYYY">
              {game.dateTime.seconds * 1000}
            </Moment>
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
