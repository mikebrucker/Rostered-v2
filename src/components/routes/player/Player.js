import React from "react";
import DeleteItem from "../utils/DeleteItem";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

const Player = ({ player, user, classes }) => {
  if (player) {
    return (
      <div className="Player">
        <Typography variant="h6">
          #{player.number} {player.firstName} {player.lastName}
        </Typography>
        <Typography inline variant="body1">
          {player.position}
          {" - "}
          {player.position === "G" ? "Catches" : "Shoots"} {player.shoots}
        </Typography>
        <CardActions className={classes.actions}>
          <DeleteItem user={user} item={player} />
        </CardActions>
      </div>
    );
  } else {
    return <div className="player">Loading...</div>;
  }
};

export default withStyles(styles)(Player);
