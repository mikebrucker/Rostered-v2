import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Schedules from "../schedule/Schedules";
import AddSchedule from "../schedule/AddSchedule";
import Players from "../player/Players";
import AddPlayer from "../player/AddPlayer";

const Team = ({ team, user, unauthorized, loaded, requesting }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  const mySchedules =
    user && user.schedules
      ? user.schedules.filter(schedule => schedule.teamId === team.id)
      : null;

  const myPlayers =
    user && user.players
      ? user.players.filter(player => player.teamId.indexOf(team.id) > -1)
      : null;

  if (loaded && team) {
    return (
      <div className="Team">
        <h1>{team.teamName}</h1>
        <div>{team.league}</div>
        <div>{team.arena}</div>
        <div>{team.sport}</div>
        <Players players={myPlayers} user={user} team={team} />
        <AddPlayer user={user} team={team} />
        <Schedules schedules={mySchedules} user={user} team={team} />
        <AddSchedule user={user} team={team} />
      </div>
    );
  } else if (requesting === false) {
    return <div className="Team">No Team Exists With That Id</div>;
  } else {
    return <div className="Team">Loading...</div>;
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
)(Team);
