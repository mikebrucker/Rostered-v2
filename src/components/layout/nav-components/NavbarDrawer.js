import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  background: {
    backgroundColor: theme.palette.primary.main
  },
  openDrawer: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    minWidth: "240px",
    width: "30vw"
  },
  listSubHeader: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    padding: "20px 0 6px 36px",
    textAlign: "left",
    margin: "0 auto"
  },
  sideMenuItem: {
    "&:hover": {
      color: "antiquewhite",
      backgroundColor: theme.palette.secondary.main
    }
  }
});

const NavbarDrawer = ({
  classes,
  links,
  color,
  anchor,
  toggleDrawer,
  isDrawerOpen,
  logoutUser
}) => {
  const drawerLinks = links
    ? links.map(link => {
        const func = link.func ? link.func : null;
        return (
          <Link
            key={link.to}
            to={link.to}
            onClick={func}
            component={NavLink}
            color={color}
          >
            <ListItem className={classes.sideMenuItem}>
              <link.icon />
              &nbsp;{link.label}
            </ListItem>
          </Link>
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
        <List>{drawerLinks}</List>
      </div>
    </Drawer>
  );
};

export default withStyles(styles)(NavbarDrawer);
