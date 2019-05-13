import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import Schedules from "../schedule/Schedules";
import Players from "../player/Players";
import DeleteItem from "../utils/DeleteItem";
import Loading from "../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 600,
    width: "100%"
  },
  card: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  font: {
    fontWeight: "bold"
  },
  deleteItem: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 16,
    backgroundColor: theme.palette.error[300]
  },
  deleteItemAction: {
    paddingTop: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  }
});

const Team = ({ team, user, setValue, currentValue, classes }) => {
  const mySchedules =
    team && user && user.schedules
      ? user.schedules.filter(schedule => schedule.teamId === team.id)
      : null;

  const currentSchedules =
    team && mySchedules
      ? mySchedules.filter(schedule => schedule.current)
      : null;

  const notCurrentSchedules =
    team && mySchedules
      ? mySchedules.filter(schedule => !schedule.current)
      : null;

  // Separate players by position and then sorts by number
  const myPlayersToBeSorted =
    team && user && user.players
      ? user.players.filter(player => player.teamId === team.id)
      : null;

  const sortPlayersByNumber = players =>
    players.sort((a, b) => a.number - b.number);

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

  // All players for this team sorted and put back into list
  const myPlayers =
    centers && leftwings && rightwings && defensemans && goalies
      ? centers
          .concat(leftwings)
          .concat(rightwings)
          .concat(defensemans)
          .concat(goalies)
      : null;

  const allOtherPlayers =
    team && user && user.players
      ? user.players.filter(player => player.teamId !== team.id)
      : null;

  // If user creates players on another team
  // That does not share names with players on this team
  // They can be selected for import in <AddPlayer />
  // Selecting only fills input fields in <AddPlayer />
  const importablePlayers =
    myPlayers && allOtherPlayers
      ? allOtherPlayers.filter(other =>
          myPlayers.filter(
            myPlayer =>
              myPlayer.firstName === other.firstName &&
              myPlayer.lastName === other.lastName
          ).length > 0
            ? false
            : true
        )
      : null;

  if (team) {
    return (
      <div className={`Team ${classes.root}`}>
        <Card raised className={classes.card}>
          <CardHeader
            classes={{ title: classes.font }}
            titleTypographyProps={{ variant: "h4" }}
            subheaderTypographyProps={{ variant: "h6" }}
            title={team.teamName}
            subheader={`Division ${team.division} at ${team.arena}`}
          />
          <Schedules
            schedules={currentSchedules}
            user={user}
            team={team}
            current
          />
          <Players
            importablePlayers={importablePlayers}
            players={myPlayers}
            user={user}
            team={team}
          />
          <Schedules schedules={notCurrentSchedules} user={user} team={team} />
        </Card>
        <Card className={classes.deleteItem}>
          <CardContent className={classes.deleteItemAction}>
            <CardActions>
              <DeleteItem
                user={user}
                item={team}
                setValue={setValue}
                currentValue={currentValue}
              />
            </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default firestoreConnect()(withStyles(styles)(Team));
