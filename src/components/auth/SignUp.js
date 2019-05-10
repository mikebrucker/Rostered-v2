import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    theme: "orangeRed",
    setTheme: true,
    error: null
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (
      e.target.name !== "number" ||
      (e.target.name === "number" &&
        e.target.value < 100 &&
        e.target.value > -1 &&
        e.target.value !== "000")
    ) {
      this.setState({
        [e.target.name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.password === this.state.passwordConfirm &&
      this.state.email.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0
    ) {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };

      const newProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        theme: this.state.theme,
        setTheme: this.state.setTheme
      };

      this.setState(
        {
          email: "",
          password: "",
          passwordConfirm: "",
          firstName: "",
          lastName: "",
          theme: "orangeRed",
          setTheme: true,
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
      { value: "orange", label: "Orange" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "gold", label: "Gold" },
      { value: "cyan", label: "Cyan" },
      { value: "purple", label: "Purple" }
    ];

    return (
      <div className={`SignUp ${classes.root}`}>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <div className={classes.textField}>
            <TextField
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

          <div>
            <FormControlLabel
              label="Tough Guy"
              control={
                <Checkbox
                  type="checkbox"
                  name="setTheme"
                  color="primary"
                  checked={this.state.setTheme}
                  onChange={this.handleChange}
                />
              }
            />
          </div>

          <div className={classes.textField}>
            <TextField
              fullWidth
              label="Theme Color"
              name="theme"
              variant="outlined"
              select
              SelectProps={{ native: true }}
              value={this.state.theme}
              onChange={this.handleChange}
            >
              {themeColors
                ? themeColors.map(color => (
                    <option key={color.value} value={color.value}>
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

const mapStateToProps = ({ firebase: { auth, authError } }) => ({
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  authError
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(withStyles(styles)(SignUp));
