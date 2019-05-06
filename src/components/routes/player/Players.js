import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Player from "./Player";

const Players = ({ unauthorized, loaded, user, players }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  const allPlayers =
    user && user.players
      ? user.players.map(player => {
          return <Player key={player.id} player={player} />;
        })
      : null;

  const myPlayers = players
    ? players.map(player => {
        return <Player key={player.id} player={player} />;
      })
    : null;

  return (
    <div>
      <h1>PLAYERS</h1>
      {myPlayers ? myPlayers : allPlayers}
    </div>
  );
};

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => ({
  auth,
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  user: ordered.users && ordered.users[0]
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(Players);
