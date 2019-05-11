import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";

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

    const themeColors = [
      { value: deepOrange, label: "Deep Orange" },
      { value: red, label: "Red" },
      { value: pink, label: "Pink" },
      { value: purple, label: "Purple" },
      { value: deepPurple, label: "Deep Purple" },
      { value: indigo, label: "Indigo" },
      { value: blue, label: "Blue" },
      { value: lightBlue, label: "Light Blue" },
      { value: cyan, label: "Cyan" },
      { value: teal, label: "Teal" },
      { value: green, label: "Green" },
      { value: lightGreen, label: "Light Green" },
      { value: lime, label: "Lime" },
      { value: yellow, label: "Yellow" },
      { value: amber, label: "Amber" },
      { value: orange, label: "Orange" }
    ];

    return (
      <div className={`SignUp ${classes.root}`}>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
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
