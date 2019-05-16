import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { IoMdLogOut, IoMdAddCircleOutline } from "react-icons/io";
import { GiHockey } from "react-icons/gi";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  title: {
    color: theme.palette.secondary.main,
    fontFamily: "Righteous, sans-serif",
    padding: theme.spacing.unit * 2
  },
  listSubheader: {
    color: theme.palette.secondary.main,
    fontFamily: "Righteous, sans-serif",
    paddingLeft: theme.spacing.unit * 2,
    cursor: "pointer"
  },
  openDrawer: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    minWidth: "240px",
    width: "30vw"
  },
  sideMenuItem: {
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main
    }
  },
  team: {
    paddingLeft: theme.spacing.unit * 4,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main
    }
  },
  activePage: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    "& svg": {
      fill: "currentColor"
    }
  }
});

const NavbarDrawer = ({
  classes,
  anchor,
  teams,
  logoutUser,
  toggleDrawer,
  isDrawerOpen,
  setTeamsTabValue
}) => {
  const addTeamIndex = teams && teams.length > 0 ? teams.length + 1 : 1;

  const teamsMap =
    teams && teams.length > 0
      ? teams.map((team, index) => {
          return (
            <ListItem
              key={team.id}
              button
              onClick={setTeamsTabValue.bind(this, index + 1)}
              className={`${classes.sideMenuItem} ${classes.team}`}
            >
              &nbsp;{team.teamName}
            </ListItem>
          );
        })
      : null;

  return (
    <Drawer anchor={anchor} open={isDrawerOpen} onClose={toggleDrawer}>
      <div
        className={classes.openDrawer}
        tabIndex={0}
        role="button"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List component="nav" disablePadding>
          <Typography
            className={classes.title}
            align="left"
            variant="h5"
            color="secondary"
          >
            &nbsp;Rostered
          </Typography>

          <ListItem
            button
            onClick={setTeamsTabValue.bind(this, 0)}
            className={classes.sideMenuItem}
          >
            <GiHockey />
            &nbsp;Dashboard
          </ListItem>
          <ListItem
            button
            onClick={setTeamsTabValue.bind(this, addTeamIndex)}
            className={classes.sideMenuItem}
          >
            <IoMdAddCircleOutline />
            &nbsp;Add Team
          </ListItem>

          <List component="div">
            <Typography
              className={classes.listSubheader}
              align="left"
              variant="h5"
              color="secondary"
            >
              &nbsp;Teams
            </Typography>
            {teamsMap}
          </List>

          <ListItem
            button
            onClick={logoutUser}
            className={classes.sideMenuItem}
          >
            <IoMdLogOut />
            &nbsp;Logout
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default withStyles(styles)(NavbarDrawer);
