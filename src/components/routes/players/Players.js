import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import AddPlayer from "./AddPlayer";

const Players = ({ unauthorized, loaded, user }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  const players =
    user && user.players
      ? user.players.map(player => {
          return (
            <div key={player.id} className="PlayerSummary">
              <div>
                {player.firstName} {player.lastName}
              </div>
              <div>{player.number}</div>
              <div>{player.position}</div>
              <div>
                {player.position === "G" ? "Catches" : "Shoots"} {player.shoots}
              </div>
            </div>
          );
        })
      : null;

  return (
    <div>
      <h1>PLAYERS</h1>
      {players}
      <AddPlayer />
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
