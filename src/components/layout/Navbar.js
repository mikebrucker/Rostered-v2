import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { actionTypes } from "redux-firestore";
import NavbarDrawer from "./NavbarDrawer";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import { FaHockeyPuck } from "react-icons/fa";
import { IoMdLogOut, IoMdLogIn, IoMdPersonAdd, IoMdMenu } from "react-icons/io";

const styles = theme => ({
  mobileLink: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  desktopLink: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  title: {
    flex: 1,
    textAlign: "left",
    fontFamily: "Righteous, sans-serif"
  },
  font: {
    fontFamily: "Righteous, sans-serif",
    textDecoration: "none",
    cursor: "pointer",
    "& svg": {
      verticalAlign: "-12.5%"
    },
    "&:hover": {
      color: theme.palette.secondary.main
    }
  }
});

class Navbar extends Component {
  state = {
    isDrawerOpen: false
  };

  scrollToTopOfPage = () => {
    document.getElementById("root").scrollIntoView({
      behavior: "smooth"
    });
  };

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  };

  logoutUser = () => {
    this.props.firebase.logout().then(() => {
      // Clear redux-firestore state on logout
      this.props.dispatch({ type: actionTypes.CLEAR_DATA });
    });
  };

  render() {
    const { classes, unauthorized } = this.props;

    const navbarLinks = unauthorized ? (
      <span>
        <Typography
          inline
          className={`${classes.font} ${classes.desktopLink}`}
          variant="h6"
          color="primary"
          to="/"
          component={NavLink}
        >
          <IoMdLogIn /> Login
        </Typography>

        <Typography
          inline
          className={`${classes.font} ${classes.desktopLink}`}
          variant="h6"
          color="primary"
          to="/signup"
          component={NavLink}
        >
          <IoMdPersonAdd /> Signup
        </Typography>

        <IconButton
          // Login Icon
          className={classes.mobileLink}
          to="/"
          component={NavLink}
          color="primary"
          aria-label="Log In"
        >
          <IoMdLogIn className={classes.navMenuSVG} />
        </IconButton>

        <IconButton
          // Sign Up Icon
          className={classes.mobileLink}
          to="/signup"
          component={NavLink}
          color="primary"
          aria-label="Sign Up"
        >
          <IoMdPersonAdd className={classes.navMenuSVG} />
        </IconButton>
      </span>
    ) : (
      <span>
        <Typography
          inline
          className={`${classes.font} ${classes.desktopLink}`}
          variant="h6"
          color="primary"
          onClick={this.logoutUser}
        >
          <IoMdLogOut /> Logout
        </Typography>
        <IconButton
          // Logout Icon
          className={classes.mobileLink}
          onClick={this.logoutUser}
          color="primary"
          aria-label="Log Out"
        >
          <IoMdLogOut className={classes.navMenuSVG} />
        </IconButton>
        <IconButton
          // Menu Icon opens Sidebar
          className={classes.mobileLink}
          onClick={this.toggleDrawer}
          color="primary"
          aria-label="Open drawer"
        >
          <IoMdMenu className={classes.navMenuSVG} />
        </IconButton>
      </span>
    );

    return (
      <nav className="Navbar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Link
              // Navbar Title
              className={classes.title}
              onClick={this.scrollToTopOfPage}
              component={NavLink}
              underline="none"
              to="/"
            >
              <Typography className={classes.font} variant="h4" color="primary">
                <FaHockeyPuck /> Rostered
              </Typography>
            </Link>

            {navbarLinks}
          </Toolbar>
        </AppBar>

        <NavbarDrawer
          unauthorized={unauthorized}
          color="secondary"
          anchor="right"
          logoutUser={this.logoutUser}
          toggleDrawer={this.toggleDrawer}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      </nav>
    );
  }
}

export default firebaseConnect()(withStyles(styles)(withRouter(Navbar)));
