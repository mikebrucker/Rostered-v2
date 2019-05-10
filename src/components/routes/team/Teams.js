import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../utils/Loading";
import Team from "./Team";
import AddTeam from "./AddTeam";

import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  tabs: {
    backgroundColor: theme.palette.primary.main,
    overflow: "hidden",
    position: "sticky",
    top: 0,
    bottom: "auto",
    zIndex: "11"
  },
  tabIndicator: {
    height: 4,
    borderRadius: theme.spacing.unit
  }
});

const Teams = ({
  user,
  unauthorized,
  loaded,
  requesting,
  classes,
  location,
  history
}) => {
  useEffect(() => {
    if (location.createdTeam) {
      teams.forEach((team, i) => {
        if (team.id === location.createdTeam) {
          setValue(i);
          location.createdTeam = null;
        }
      });
    }
  });

  const [value, setValue] = useState(0);
  if (loaded && unauthorized) return <Redirect to="/login" />;

  const teams = user && user.teams && user.teams.length > 0 ? user.teams : null;

  const tabs = teams
    ? teams.map(team => {
        return <Tab color="secondary" key={team.id} label={team.teamName} />;
      })
    : null;

  if (loaded && teams) {
    return (
      <div className="Teams">
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
          classes={{
            root: classes.tabs,
            indicator: classes.tabIndicator
          }}
        >
          {tabs}
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={i => setValue(i)}>
          {teams &&
            teams.map(team => (
              <Team
                key={team.id}
                team={team}
                user={user}
                setValue={setValue}
                currentValue={value}
              />
            ))}
        </SwipeableViews>
      </div>
    );
  } else if (requesting === false) {
    return <AddTeam history={history} location={location} />;
  } else {
    return <Loading fixed />;
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
)(withStyles(styles)(Teams));
