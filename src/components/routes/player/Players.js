import React, { useState } from "react";
import Player from "./Player";
import AddPlayer from "./AddPlayer";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
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
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.secondary[50]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.primary[100]
    }
  },
  players: {
    backgroundColor: theme.palette.secondary[100]
  },
  font: {
    fontWeight: "bold"
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

const Players = ({ user, team, classes }) => {
  const [showPlayers, setShowPlayers] = useState(true);

  // Separate players by position and then sorts by number
  const sortPlayersByNumber = players =>
    players.sort((a, b) => a.number - b.number);

  const myPlayersToBeSorted =
    user && team && user.players
      ? user.players.filter(player => player.teamId === team.id)
      : null;

  const centers = myPlayersToBeSorted
    ? sortPlayersByNumber(
        myPlayersToBeSorted.filter(center => center.position === "C")
      )
    : null;

  const leftwings = myPlayersToBeSorted
    ? sortPlayersByNumber(
        myPlayersToBeSorted.filter(leftwing => leftwing.position === "LW")
      )
    : null;

  const rightwings = myPlayersToBeSorted
    ? sortPlayersByNumber(
        myPlayersToBeSorted.filter(rightwing => rightwing.position === "RW")
      )
    : null;

  const defensemans = myPlayersToBeSorted
    ? sortPlayersByNumber(
        myPlayersToBeSorted.filter(defenseman => defenseman.position === "D")
      )
    : null;

  const goalies = myPlayersToBeSorted
    ? sortPlayersByNumber(
        myPlayersToBeSorted.filter(goalie => goalie.position === "G")
      )
    : null;

  const players =
    centers && leftwings && rightwings && defensemans && goalies
      ? [...centers, ...leftwings, ...rightwings, ...defensemans, ...goalies]
      : null;

  const allOtherPlayers =
    user && team && user.players
      ? user.players.filter(player => player.teamId !== team.id)
      : null;

  // If user creates players on another team
  // That does not share names with players on this team
  // They can be selected for import in <AddPlayer />
  // Selecting only fills input fields in <AddPlayer />
  const importablePlayers =
    players && allOtherPlayers
      ? allOtherPlayers.filter(other =>
          players.filter(
            myPlayer =>
              myPlayer.firstName === other.firstName &&
              myPlayer.lastName === other.lastName
          ).length > 0
            ? false
            : true
        )
      : null;

  const myPlayers =
    players && players.length > 0 ? (
      players.map(player => {
        return (
          <div key={player.id} className={classes.card}>
            <Player player={player} user={user} />
          </div>
        );
      })
    ) : (
      <div className={classes.card}>
        <Typography variant="h6">No Players Added</Typography>
        <Typography variant="body1">Add Player Below</Typography>
      </div>
    );

  return (
    <CardContent className={`Players ${classes.players}`}>
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
        <Card raised>
          <CardHeader
            classes={{ root: classes.card, title: classes.font }}
            title={`${team.teamName} Players`}
          />
          {myPlayers}
          <AddPlayer
            classes={{ root: classes.card }}
            importablePlayers={importablePlayers}
            user={user}
            team={team}
          />
        </Card>
      </Collapse>
    </CardContent>
  );
};

export default withStyles(styles)(Players);
