import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import theme from "./material-ui-theme/theme";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Teams from "./components/routes/team/Teams";
import AddTeam from "./components/routes/team/AddTeam";
import Profile from "./components/routes/profile/Profile";

const styles = theme => ({
  App: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  footerGrow: {
    flexGrow: 1
  }
});

function App({ user, authError, unauthorized, loaded, requesting, classes }) {
  const myTheme =
    user && user.themeColor
      ? createMuiTheme({
          ...theme,
          palette: {
            ...theme.palette,
            primary: JSON.parse(user.themeColor)
          }
        })
      : createMuiTheme(theme);

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={myTheme}>
        <CssBaseline />
        <div className={classes.App}>
          <Navbar unauthorized={unauthorized} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Teams
                  {...props}
                  user={user}
                  unauthorized={unauthorized}
                  loaded={loaded}
                  requesting={requesting}
                />
              )}
            />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignUp
                  {...props}
                  user={user}
                  unauthorized={unauthorized}
                  authError={authError}
                />
              )}
            />
            <Route
              exact
              path="/addteam"
              render={props => (
                <AddTeam
                  {...props}
                  user={user}
                  unauthorized={unauthorized}
                  loaded={loaded}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  {...props}
                  user={user}
                  unauthorized={unauthorized}
                  loaded={loaded}
                />
              )}
            />
          </Switch>
          <div className={classes.footerGrow} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = ({
  firebase: { auth, authError },
  firestore: { ordered, status }
}) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  // Check if firestore is requesting. It is false when done.
  // If done and no team with that id display No Team With That Id text
  const requesting = user ? status.requesting[`users/${user.id}`] : null;
  return {
    auth,
    authError,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user,
    requesting
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(withStyles(styles)(App));
