import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import AddTeam from "./AddTeam";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const Teams = ({ unauthorized, loaded, user }) => {
  const teams =
    user && user.teams
      ? user.teams.map(team => {
          return (
            <Link
              key={team.id}
              color="secondary"
              component={RouterLink}
              underline="none"
              to={`/teams/${team.id}`}
            >
              <div className="TeamSummary">{team.teamName}</div>
            </Link>
          );
        })
      : null;
  if (loaded && unauthorized) return <Redirect to="/login" />;
  return (
    <div>
      <h1>TEAMS</h1>
      {teams}
      <AddTeam />
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
)(Teams);
