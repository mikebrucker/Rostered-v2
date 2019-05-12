import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { actionTypes } from "redux-firestore";

import NavbarLinks from "./nav-components/NavbarLinks";
import NavbarDrawer from "./nav-components/NavbarDrawer";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { FaHockeyPuck } from "react-icons/fa";
import { GiHockey } from "react-icons/gi";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";

const styles = theme => ({
  navbarLinks: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  menuIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  title: {
    flex: 1,
    textAlign: "left",
    fontFamily: "Righteous, sans-serif"
  },
  appBar: {
    zIndex: "1200",
    overflow: "hidden"
  },
  font: {
    fontFamily: "Righteous, sans-serif",
    "& svg": {
      verticalAlign: "-12.5%"
    },
    "&:hover": {
      color: "antiquewhite"
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

    const navbarLinks = unauthorized
      ? [
          { to: "/signup", label: "Sign Up", icon: LibraryAddIcon },
          { to: "/", label: "Login", icon: IoMdLogIn }
        ]
      : [
          {
            label: "Dashboard",
            icon: GiHockey,
            to: "/"
          },
          {
            label: "Logout",
            icon: IoMdLogOut,
            func: this.logoutUser
          }
        ];

    return (
      <nav className={classes.appBar}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link
              // Navbar Title
              className={classes.title}
              onClick={this.scrollToTopOfPage}
              color="secondary"
              component={NavLink}
              underline="none"
              to="/"
            >
              <Typography
                className={classes.font}
                variant="h4"
                color="secondary"
              >
                <FaHockeyPuck /> Rostered
              </Typography>
            </Link>

            <div className={classes.navbarLinks}>
              <NavbarLinks
                links={navbarLinks}
                color="secondary"
                logoutUser={this.logoutUser}
              />
            </div>

            <IconButton
              // Menu Icon opens Sidebar
              className={classes.menuIcon}
              onClick={this.toggleDrawer}
              color="secondary"
              aria-label="Open drawer"
            >
              <MenuIcon className={classes.navMenuSVG} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <NavbarDrawer
          color="secondary"
          links={navbarLinks}
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
