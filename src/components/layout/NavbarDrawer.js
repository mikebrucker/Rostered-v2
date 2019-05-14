import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { IoMdLogOut, IoMdLogIn, IoMdPersonAdd } from "react-icons/io";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  listSubheader: {
    color: theme.palette.secondary.main,
    fontFamily: "Righteous, sans-serif",
    padding: theme.spacing.unit * 2,
    "& svg": {
      height: theme.spacing.unit * 3,
      width: theme.spacing.unit * 3
    }
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
  color,
  anchor,
  unauthorized,
  logoutUser,
  toggleDrawer,
  isDrawerOpen
}) => {
  const links = unauthorized
    ? [
        { to: "/signup", label: "Sign Up", icon: IoMdPersonAdd },
        { to: "/", label: "Login", icon: IoMdLogIn }
      ]
    : [
        {
          label: "Logout",
          icon: IoMdLogOut,
          func: logoutUser
        }
      ];

  const drawerLinks = links
    ? links.map(link => {
        const func = link.func ? link.func : null;
        if (func) {
          return (
            <ListItem
              key={link.label}
              onClick={func}
              color={color}
              className={classes.sideMenuItem}
            >
              <link.icon />
              &nbsp;{link.label}
            </ListItem>
          );
        } else {
          return (
            <ListItem
              key={link.label}
              to={link.to}
              exact
              activeClassName={classes.activePage}
              component={NavLink}
              color={color}
              className={classes.sideMenuItem}
            >
              <link.icon />
              &nbsp;{link.label}
            </ListItem>
          );
        }
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
            className={classes.listSubheader}
            align="left"
            variant="h5"
            color="secondary"
          >
            &nbsp;Rostered
          </Typography>
          {drawerLinks}
        </List>
      </div>
    </Drawer>
  );
};

export default withStyles(styles)(NavbarDrawer);
