import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
// import { signOut } from "../../store/actions/authActions";

import NavbarTabs from "./nav-components/NavbarTabs";
import NavbarDrawer from "./nav-components/NavbarDrawer";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  FaHockeyPuck,
  FaUsers,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCheck
} from "react-icons/fa";
import { GiHockey, GiThreeFriends } from "react-icons/gi";

const styles = theme => ({
  title: {
    flex: 1,
    textAlign: "left",
    fontSize: "2.4em",
    fontFamily: "Metal Mania, serif",
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
    overflow: "hidden",
    position: "sticky",
    top: 0,
    bottom: "auto",
    zIndex: "11"
  }
});

class Navbar extends Component {
  state = {
    isDrawerOpen: false,
    value: 0
  };

  componentDidMount() {
    let navbarLocalStorageState = JSON.parse(
      localStorage.getItem("rostered-navbar-state")
    );
    if (navbarLocalStorageState) {
      this.setState(navbarLocalStorageState);
    }
  }

  scrollToTopOfPage = () => {
    document.getElementById("root").scrollIntoView({
      behavior: "smooth"
    });
    this.handleChange(null, 0);
  };

  handleChange = (e, value) => {
    this.setState({ value }, () =>
      localStorage.setItem("rostered-navbar-state", JSON.stringify(this.state))
    );
  };

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  };

  signOutUser = () => {
    this.props.firebase.logout();
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
          { to: "/", label: "Dashboard", icon: GiHockey },
          { to: "/teams", label: "Teams", icon: GiThreeFriends },
          { to: "/players", label: "Players", icon: FaUsers }
        ];

    const signOutButton = (
      <IconButton
        className={classes.navMenuLink}
        onClick={this.signOutUser}
        color="secondary"
        aria-label="Sign Out"
      >
        <FaSignOutAlt className={classes.navMenuSVG} />
      </IconButton>
    );

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
            <NavbarTabs
              links={navbarLinks}
              color="secondary"
              value={this.state.value}
              handleChange={this.handleChange}
            />
            {signOutButton}
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
          handleChange={this.handleChange}
          toggleDrawer={this.toggleDrawer}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  unauthorized: state.firebase.auth.isEmpty
});

export default compose(
  firebaseConnect(),

  connect(
    mapStateToProps,
    null
  )
)(withStyles(styles)(withRouter(Navbar)));
