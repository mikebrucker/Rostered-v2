import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp";
import Teams from "./components/routes/team/Teams";
import WrongPage from "./components/utils/WrongPage";

import { theme } from "./material-ui-theme/theme";
import { themeColors } from "./material-ui-theme/theme";

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

function App({ user, authError, unauthorized, loaded, classes }) {
  const myThemeColors = themeColors.map(color => color.value);

  const myThemeColor =
    user && user.themeColor && user.themeColor !== "RANDOM" && myThemeColors
      ? JSON.parse(user.themeColor)
      : user && user.themeColor && user.themeColor === "RANDOM" && myThemeColors
      ? myThemeColors[Math.floor(Math.random() * myThemeColors.length)]
      : myThemeColors[0];

  const myTheme = createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: myThemeColor
    }
  });

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={myTheme}>
        <CssBaseline />
        <div className={classes.App}>
          <Navbar unauthorized={unauthorized} user={user} />
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
                  authError={authError}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignUp
                  {...props}
                  unauthorized={unauthorized}
                  loaded={loaded}
                  authError={authError}
                />
              )}
            />
            <Route exact path="/:id" component={WrongPage} />
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
  firestore: { ordered }
}) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  return {
    auth,
    authError,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(withStyles(styles)(App));
