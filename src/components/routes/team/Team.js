import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Schedules from "../schedule/Schedules";
import AddSchedule from "../schedule/AddSchedule";
import Players from "../player/Players";
import AddPlayer from "../player/AddPlayer";
import DeleteItem from "../delete/DeleteItem";

const Team = ({ team, user, unauthorized, loaded, requesting }) => {
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
      <div className="Team">
        <h1>{team.teamName}</h1>
        <div>{team.league}</div>
        <div>{team.arena}</div>
        <div>{team.sport}</div>
        <Schedules
          schedules={currentSchedules}
          user={user}
          team={team}
          current={true}
        />
        <Players players={myPlayers} user={user} team={team} />
        <AddPlayer
          importablePlayers={importablePlayers}
          user={user}
          team={team}
        />
        <Schedules
          schedules={notCurrentSchedules}
          user={user}
          team={team}
          current={false}
        />
        <AddSchedule user={user} team={team} />
        <DeleteItem user={user} item={team} />
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
