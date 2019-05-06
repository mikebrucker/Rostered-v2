import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  textField: {
    padding: theme.spacing.unit
  },
  button: {
    padding: theme.spacing.unit
  }
});

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const creds = { email: this.state.email, password: this.state.password };
    this.setState({ email: "", password: "" }, () =>
      this.props.firebase.login(creds)
    );
  };

  render() {
    const { unauthorized, loaded, authError, classes } = this.props;
    if (loaded && !unauthorized) return <Redirect to="/" />;

    return (
      <div className={`Login ${classes.root}`}>
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <div className={classes.textField}>
            <TextField
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.textField}>
            <TextField
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.button}>
            <Button type="submit" color="primary" variant="outlined">
              Login
            </Button>
            <div>{authError ? <p>{authError.message}</p> : null}</div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase: { auth, authError } }) => ({
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  authError
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(withStyles(styles)(Login));
