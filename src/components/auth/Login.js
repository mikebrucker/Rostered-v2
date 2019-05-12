import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  button: {
    padding: theme.spacing.unit
  },
  font: {
    fontFamily: "Righteous, sans-serif",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
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
    const { authError, classes } = this.props;

    return (
      <div className={`Login ${classes.root}`}>
        <Typography className={classes.font} variant="h4">
          Login
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.textField}>
            <TextField
              autoFocus
              fullWidth
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
              fullWidth
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
            <Button type="submit" color="primary" variant="contained">
              Login
            </Button>
            <div>{authError ? <p>{authError.message}</p> : null}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default firebaseConnect()(withStyles(styles)(Login));
