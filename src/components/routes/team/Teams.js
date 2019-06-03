import React, { useState } from "react";
import Loading from "../../utils/Loading";
import Team from "./Team";
import AddTeam from "./AddTeam";
import Navbar from "../../layout/Navbar";
import Profile from "../profile/Profile";

import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";

const styles = theme => ({
  tabIndicator: {
    height: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit
  }
});

const Teams = ({ user, unauthorized, loaded, authError, classes }) => {
  const [tabValue, setTabValue] = useState(0);

  const teams = user && user.teams && user.teams.length > 0 ? user.teams : [];

  const tabs = teams
    ? teams.map(team => (
        <Tab color="secondary" key={team.id} label={team.teamName} />
      ))
    : null;

  const teamsMap = teams
    ? teams.map((team, index) =>
        tabValue === index + 1 ? (
          <Team
            key={team.id}
            team={team}
            user={user}
            setTabValue={setTabValue}
            currentTabValue={tabValue}
          />
        ) : null
      )
    : null;

  if (loaded && user) {
    return (
      <div className="Teams">
        <Navbar
          unauthorized={unauthorized}
          teams={teams}
          setTabValue={setTabValue}
        />
        <AppBar position="sticky" color="primary">
          <Tabs
            value={tabValue}
            onChange={(e, i) => setTabValue(i)}
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
        {tabValue === 0 && <Profile user={user} />}
        {teamsMap}
        {tabValue === teams.length + 1 && <AddTeam user={user} teams={teams} />}
      </div>
    );
  } else if (loaded && unauthorized) {
    return (
      <div className="Auth">
        <Navbar
          unauthorized={unauthorized}
          teams={teams}
          setTabValue={setTabValue}
        />
        <AppBar position="sticky" color="primary">
          <Tabs
            value={tabValue}
            onChange={(e, i) => setTabValue(i)}
            variant="fullWidth"
            scrollButtons="auto"
            indicatorColor="secondary"
            textColor="secondary"
            classes={{
              indicator: classes.tabIndicator
            }}
          >
            <Tab color="secondary" label="Login" />
            <Tab color="secondary" label="Sign Up" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          disableLazyLoading
          index={tabValue}
          onSwitching={i => setTabValue(Math.round(i))}
        >
          <Login authError={authError} />
          <SignUp
            unauthorized={unauthorized}
            loaded={loaded}
            authError={authError}
          />
        </SwipeableViews>
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Teams);
