import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { actionTypes } from "redux-firestore";

import NavbarLinks from "./nav-components/NavbarLinks";
import NavbarDrawer from "./nav-components/NavbarDrawer";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  FaHockeyPuck,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCheck,
  FaUserAlt
} from "react-icons/fa";
import { GiHockey, GiThreeFriends } from "react-icons/gi";

const styles = theme => ({
  title: {
    flex: 1,
    textAlign: "left",
    fontSize: "2.4em",
    fontFamily: "Righteous, sans-serif",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.7em"
    },
    "&:hover": {
      color: "antiquewhite"
    },
    "& svg": {
      verticalAlign: "-10%"
    }
  },
  appBar: {
    zIndex: "1200",
    overflow: "hidden"
  }
});

class Navbar extends Component {
  state = {
    isDrawerOpen: false,
    value: 0
  };

  scrollToTopOfPage = () => {
    document.getElementById("root").scrollIntoView({
      behavior: "smooth"
    });
    this.handleChange(null, 0);
  };

  handleChange = (e, value) => {
    this.setState({ value });
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
    this.setState({ value: 0 });
    this.props.history.push("/login");
  };

  render() {
    const { classes, unauthorized } = this.props;

    const navbarLinks = unauthorized
      ? [
          { to: "/login", label: "Login", icon: FaSignInAlt },
          { to: "/signup", label: "Sign Up", icon: FaUserCheck }
        ]
      : [
          { to: "/", label: "Teams", icon: GiHockey },
          { to: "/addteam", label: "Add Team", icon: GiThreeFriends },
          { to: "/profile", label: "Profile", icon: FaUserAlt },
          {
            to: "/login",
            label: "Logout",
            icon: FaSignOutAlt,
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
              <FaHockeyPuck /> Rostered
            </Link>
            <NavbarLinks
              links={navbarLinks}
              color="secondary"
              value={this.state.value}
              handleChange={this.handleChange}
              logoutUser={this.logoutUser}
            />
            <IconButton
              // Menu Icon opens Sidebar
              className={classes.navMenuLink}
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
