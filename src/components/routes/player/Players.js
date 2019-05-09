import React, { useState } from "react";
import Player from "./Player";
import AddPlayer from "./AddPlayer";

import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  card: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.background.player
    },
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.background.player2
    }
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

const Players = ({ user, team, players, importablePlayers, classes }) => {
  const [showPlayers, setShowPlayers] = useState(true);

  const myPlayers = players
    ? players.map(player => {
        return (
          <div key={player.id} className={classes.card}>
            <Player player={player} user={user} />
          </div>
        );
      })
    : null;

  return (
    <CardContent className="Players">
      <CardActions className={classes.actions}>
        <Button
          className={classes.button}
          onClick={() => setShowPlayers(!showPlayers)}
          color="secondary"
          variant="contained"
          aria-label="Show Players"
          size="small"
        >
          Players
          <ExpandMoreIcon
            className={`${classes.expand} ${
              showPlayers ? classes.expandOpen : null
            }`}
          />
        </Button>
      </CardActions>
      <Collapse in={showPlayers}>
        {myPlayers}
        <AddPlayer
          importablePlayers={importablePlayers}
          user={user}
          team={team}
        />
      </Collapse>
    </CardContent>
  );
};

export default withStyles(styles)(Players);
