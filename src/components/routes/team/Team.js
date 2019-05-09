import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Schedules from "../schedule/Schedules";
import Players from "../player/Players";
import DeleteItem from "../utils/DeleteItem";
import Loading from "../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import CardActionArea from "@material-ui/core/CardActionArea";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 756,
    width: "100%"
  },
  card: {
    margin: theme.spacing.unit
  },
  deleteItem: {
    marginTop: theme.spacing.unit * 10
  },
  loading: {
    position: "fixed",
    height: "100vh",
    width: "100vw"
  }
});

const Team = ({ team, user, unauthorized, loaded, requesting, classes }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

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

  const myPlayers =
    team && user && user.players
      ? user.players.filter(player => player.teamId === team.id)
      : null;

  const allOtherPlayers =
    team && user && user.players
      ? user.players.filter(player => player.teamId !== team.id)
      : null;

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

  if (loaded && team) {
    return (
      <div className={`Team ${classes.root}`}>
        <Card raised className={classes.card}>
          <CardHeader
            titleTypographyProps={{ variant: "h4" }}
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
          <CardContent>
            <CardActions className={classes.deleteItem}>
              <DeleteItem user={user} item={team} />
            </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  } else if (requesting === false) {
    return <div className="Team">No Team Exists With That Id</div>;
  } else {
    return <Loading fixed />;
  }
};

const mapStateToProps = (
  { firebase: { auth }, firestore: { ordered, status } },
  ownProps
) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  const team =
    user && user.teams
      ? user.teams.filter(team => team.id === ownProps.match.params.id)[0]
      : null;
  // Check if firestore is requesting. It is false when done.
  // If done and no team with that id display No Team With That Id text
  const requesting = user ? status.requesting[`users/${user.id}`] : null;
  return {
    auth,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user,
    team,
    requesting
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(withStyles(styles)(Team));
