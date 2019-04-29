import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavbarTabs from "./nav-components/NavbarTabs";
import NavbarDrawer from "./nav-components/NavbarDrawer";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { FaHockeyPuck, FaUsers } from "react-icons/fa";
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

  render() {
    const { classes } = this.props;
    const navbarLinks = [
      { to: "/", label: "Dashboard", icon: GiHockey },
      { to: "/teams", label: "Teams", icon: GiThreeFriends },
      { to: "/players", label: "Players", icon: FaUsers }
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
            <NavbarTabs
              links={navbarLinks}
              color="secondary"
              value={this.state.value}
              handleChange={this.handleChange}
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
          handleChange={this.handleChange}
          toggleDrawer={this.toggleDrawer}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      </nav>
    );
  }
}

export default withStyles(styles)(Navbar);
