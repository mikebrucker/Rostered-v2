import React, { useState } from "react";
import Loading from "../utils/Loading";
import Team from "./Team";
import AddTeam from "./AddTeam";
import Profile from "../profile/Profile";

import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "../../auth/Login";

const styles = theme => ({
  tabIndicator: {
    height: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit
  }
});

// Try class component with state to see if swipe on first load
const Teams = ({ user, unauthorized, loaded, authError, classes }) => {
  const [value, setValue] = useState(0);
  const handleChange = (e, i) => setValue(i);
  const handleChangeIndex = i => setValue(i);

  const teams = user && user.teams && user.teams.length > 0 ? user.teams : null;

  const tabs = teams
    ? teams.map(team => {
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

  const swipeableViews =
    teams && teamMap ? (
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <Profile user={user} />
        {teamMap}
        <AddTeam user={user} />
      </SwipeableViews>
    ) : (
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <Profile user={user} />
        <AddTeam user={user} />
      </SwipeableViews>
    );

  if (loaded && user) {
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
            <Tab color="secondary" label="Dashboard" />
            {tabs}
            <Tab color="secondary" label="Add Team" />
          </Tabs>
        </AppBar>
        {swipeableViews}
      </div>
    );
  } else if (loaded && unauthorized) {
    return <Login authError={authError} />;
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Teams);
