import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./material-ui-theme/theme";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Team from "./components/routes/team/Team";
import Teams from "./components/routes/team/Teams";
import AddTeam from "./components/routes/team/AddTeam";

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

function App({ classes }) {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.App}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Teams} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/addteam" component={AddTeam} />
            <Route exact path="/:id" component={Team} />
          </Switch>
          <div className={classes.footerGrow} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default withStyles(styles)(App);
