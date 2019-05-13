import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { themeColors } from "../../material-ui-theme/theme";

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

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    themeColor: JSON.stringify(deepOrange),
    error: null
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.password === this.state.passwordConfirm &&
      this.state.email.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.themeColor
    ) {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };

      const newProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        themeColor: this.state.themeColor
      };

      this.setState(
        {
          email: "",
          password: "",
          passwordConfirm: "",
          firstName: "",
          lastName: "",
          themeColor: JSON.stringify(deepOrange),
          error: null
        },
        () => {
          this.props.firebase.createUser(newUser, newProfile);
        }
      );
    } else {
      this.setState({
        error: "Passwords Do Not Match"
      });
    }
  };

  render() {
    const { unauthorized, loaded, authError, classes } = this.props;
    if (loaded && !unauthorized) return <Redirect to="/" />;

    return (
      <div className={`SignUp ${classes.root}`}>
        <Typography className={classes.font} variant="h4" color="secondary">
          Sign Up
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.textField}>
            <TextField
              autoFocus
              fullWidth
              label="First Name"
              placeholder="First Name"
              type="text"
              name="firstName"
              variant="outlined"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.textField}>
            <TextField
              fullWidth
              label="Last Name"
              placeholder="Last Name"
              type="text"
              name="lastName"
              variant="outlined"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.textField}>
            <TextField
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

          <div className={classes.textField}>
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              name="passwordConfirm"
              variant="outlined"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.textField}>
            <TextField
              fullWidth
              label="Theme Color"
              name="themeColor"
              variant="outlined"
              select
              SelectProps={{ native: true }}
              value={this.state.themeColor}
              onChange={this.handleChange}
            >
              {themeColors
                ? themeColors.map(color => (
                    <option
                      key={color.label}
                      value={JSON.stringify(color.value)}
                    >
                      {color.label}
                    </option>
                  ))
                : null}
              <option value={"RANDOM"}>Random</option>
            </TextField>
          </div>

          <div className={classes.button}>
            <Button type="submit" color="primary" variant="contained">
              Sign Up
            </Button>
            <div>
              {authError ? <p>{authError.message}</p> : null}
              {this.state.error ? <p>{this.state.error}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default firebaseConnect()(withStyles(styles)(SignUp));
