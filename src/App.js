import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "./material-ui-theme/theme";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Team from "./components/routes/team/Team";
import Teams from "./components/routes/team/Teams";
import Players from "./components/routes/players/Players";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/teams/:id" component={Team} />
            <Route exact path="/players" component={Players} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
          <div className="footer-grow" />
          <Footer />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
