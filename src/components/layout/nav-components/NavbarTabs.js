import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  navBarLinks: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  navBarLink: {
    zIndex: "10",
    fontSize: "1.3em",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
    "& svg": {
      // fontSize: "1em"
      verticalAlign: "text-bottom"
    },
    "&:hover": {
      color: "antiquewhite"
    }
  },
  activePage: {
    color: "antiquewhite",
    backgroundColor: theme.palette.secondary.main,
    display: "inline-block",
    "& svg": {
      fill: "antiquewhite"
    }
  }
});

const NavbarTabs = ({ classes, links, color, handleChange, value }) => {
  const tabLinks = links
    ? links.map(link => {
        return (
          <Link
            color="secondary"
            key={link.to}
            className={classes.navBarLink}
            exact
            activeClassName={classes.activePage}
            to={link.to}
            component={NavLink}
            underline="none"
          >
            <link.icon /> {link.label}
          </Link>
        );
      })
    : null;

  return (
    // <Tabs
    //   value={value}
    //   onChange={handleChange}
    //   variant="fullWidth"
    //   indicatorColor={color}
    //   textColor={color}
    //   classes={{ root: classes.navBarLinks, indicator: classes.tabIndicator }}
    // >
    <div>{tabLinks}</div>
    // </Tabs>
  );
};

export default withStyles(styles)(NavbarTabs);
