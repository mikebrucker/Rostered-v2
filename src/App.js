import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Team from "./components/team/Team";
import Teams from "./components/team/Teams";
import "./App.scss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./material-ui-theme/theme";
import Dashboard from "./components/layout/Dashboard";
import Footer from "./components/layout/Footer";
import * as ROUTES from "./constants/routes";
import Players from "./components/players/Players";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route exact path={ROUTES.TEAMS} component={Teams} />
            <Route exact path={ROUTES.TEAM} component={Team} />
            <Route exact path={ROUTES.PLAYERS} component={Players} />
            <Route exact path={ROUTES.LOG_IN} component={Login} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
          <div className="footer-grow" />
          <Footer />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
