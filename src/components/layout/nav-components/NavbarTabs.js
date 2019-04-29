import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  navBarLinks: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  navBarLink: {
    zIndex: "10",
    "& svg": {
      fontSize: "2em"
    },
    "&:hover": {
      "& span": {
        color: "antiquewhite"
      }
    }
  },
  activePage: {
    "& span": {
      color: "antiquewhite"
    },
    "& svg": {
      fill: "antiquewhite"
    }
  },
  tabIndicator: {
    height: "100%"
  }
});

const NavbarTabs = ({ classes, links, color, handleChange, value }) => {
  const tabLinks = links
    ? links.map(link => {
        return (
          <Tab
            key={link.to}
            className={classes.navBarLink}
            exact
            activeClassName={classes.activePage}
            to={link.to}
            component={NavLink}
            icon={<link.icon />}
            label={link.label}
          />
        );
      })
    : null;

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor={color}
      textColor={color}
      classes={{ root: classes.navBarLinks, indicator: classes.tabIndicator }}
    >
      {tabLinks}
    </Tabs>
  );
};

export default withStyles(styles)(NavbarTabs);
