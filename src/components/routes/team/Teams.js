import React, { useState } from "react";
import Loading from "../../utils/Loading";
import Team from "./Team";
import AddTeam from "./AddTeam";
import Profile from "../profile/Profile";

// import SwipeableViews from "react-swipeable-views";
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

const Teams = ({ user, unauthorized, loaded, authError, classes }) => {
  const [tabValue, setTabValue] = useState(0);
  // const handleChangeIndex = i => setValue(i);

  const teams = user && user.teams && user.teams.length > 0 ? user.teams : null;

  const tabs = teams
    ? teams.map(team => {
        return <Tab color="secondary" key={team.id} label={team.teamName} />;
      })
    : null;

  const teamMap = teams
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

  // const swipeableViews =
  //   teams && teamMap ? (
  //     <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
  //       <Profile user={user} />
  //       {teamMap}
  //       <AddTeam user={user} />
  //     </SwipeableViews>
  //   ) : (
  //     <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
  //       <Profile user={user} />
  //       <AddTeam user={user} />
  //     </SwipeableViews>
  //   );

  if (loaded && user) {
    return (
      <div className="Teams">
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
        {teamMap}
        {tabValue === teams.length + 1 && <AddTeam user={user} />}
      </div>
    );
  } else if (loaded && unauthorized) {
    return <Login authError={authError} />;
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Teams);
