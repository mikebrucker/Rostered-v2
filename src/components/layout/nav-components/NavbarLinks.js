import React from "react";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  navbarLink: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    fontFamily: "Righteous, sans-serif",
    "& svg": {
      height: "24px",
      width: "24px",
      verticalAlign: "text-bottom"
    },
    "&:hover": {
      color: "antiquewhite"
    }
  }
});

const NavbarLinks = ({ classes, links }) => {
  const tabLinks = links
    ? links.map(link => {
        const func = link.func ? link.func : null;
        if (func) {
          return (
            <Typography
              key={link.label}
              inline
              className={classes.navbarLink}
              variant="h6"
              color="secondary"
              onClick={func}
            >
              <link.icon /> {link.label}
            </Typography>
          );
        } else {
          return (
            <Link
              color="secondary"
              key={link.label}
              exact
              to={link.to}
              component={NavLink}
              underline="none"
            >
              <Typography
                inline
                className={classes.navbarLink}
                variant="h6"
                color="secondary"
              >
                <link.icon /> {link.label}
              </Typography>
            </Link>
          );
        }
      })
    : null;

  return <div>{tabLinks}</div>;
};

export default withStyles(styles)(NavbarLinks);
