import React from "react";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
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
    paddingLeft: 12,
    paddingRight: 12,
    "& svg": {
      verticalAlign: "text-bottom"
    },
    "&:hover": {
      color: "antiquewhite"
    }
  },
  activePage: {
    color: "antiquewhite",
    "& svg": {
      fill: "antiquewhite"
    }
  }
});

const NavbarLinks = ({ classes, links }) => {
  const tabLinks = links
    ? links.map(link => {
        const func = link.func ? link.func : null;
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
            onClick={func}
          >
            <link.icon /> {link.label}
          </Link>
        );
      })
    : null;

  return <div className={classes.navBarLinks}>{tabLinks}</div>;
};

export default withStyles(styles)(NavbarLinks);
