import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import AddTeam from "./AddTeam";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const Teams = ({ user, unauthorized, loaded, requesting }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  const teams =
    user && user.teams && user.teams.length > 0
      ? user.teams.map(team => {
          return (
            <div key={team.id} className="TeamSummary">
              <Link
                key={team.id}
                color="secondary"
                component={RouterLink}
                underline="none"
                to={`/teams/${team.id}`}
              >
                {team.teamName}
              </Link>
            </div>
          );
        })
      : null;

  if (loaded && teams) {
    return (
      <div className="Teams">
        <h1>TEAMS</h1>
        {teams}
        <AddTeam user={user} />
      </div>
    );
  } else if (requesting === false) {
    return (
      <div className="Teams">
        No Teams Added Yet
        <AddTeam user={user} />
      </div>
    );
  } else {
    return <div className="Team">Loading...</div>;
  }
};

const mapStateToProps = ({
  firebase: { auth },
  firestore: { ordered, status }
}) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  // Check if firestore is requesting. It is false when done.
  // If done and no team with that id display No Team With That Id text
  const requesting = user ? status.requesting[`users/${user.id}`] : null;
  return {
    auth,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user,
    requesting
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(Teams);
