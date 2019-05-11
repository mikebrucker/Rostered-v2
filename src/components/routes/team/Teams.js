import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../utils/Loading";
import Team from "./Team";
import AddTeam from "./AddTeam";

import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
  // Try class component with state to see if swipe on first load
  useEffect(() => {
    if (location.createdTeam && teams) {
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
    ? teams.map((team, i) => {
        return <Tab color="secondary" key={team.id} label={team.teamName} />;
      })
    : null;

  const teamMap = teams
    ? teams.map(team => (
        <Team
          key={team.id}
          team={team}
          user={user}
          setValue={setValue}
          currentValue={value}
        />
      ))
    : null;

  const handleChange = (e, i) => setValue(i);
  const handleChangeIndex = i => setValue(i);
  if (loaded && teams) {
    return (
      <div className="Teams">
        <AppBar position="sticky" color="primary">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="secondary"
            textColor="secondary"
            classes={{
              indicator: classes.tabIndicator
            }}
          >
            {tabs}
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          {teamMap}
        </SwipeableViews>
      </div>
    );
  } else if (requesting === false) {
    return (
      <AddTeam
        user={user}
        unauthorized={unauthorized}
        loaded={loaded}
        history={history}
        location={location}
      />
    );
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Teams);
