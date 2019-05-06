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
    padding: theme.spacing.unit,
    display: "inline-block"
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
    number: "",
    position: "C",
    shoots: "Right",
    addToPlayerList: true
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({
      [e.target.name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };
      const newProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      };
      this.setState(
        {
          email: "",
          password: "",
          passwordConfirm: "",
          firstName: "",
          lastName: "",
          number: "",
          position: "C",
          shoots: "Right",
          addToPlayerList: true
        },
        () => {
          this.props.firebase.createUser(newUser, newProfile);
        }
      );
    }
  };

  render() {
    const { unauthorized, loaded, authError, classes } = this.props;
    if (loaded && !unauthorized) return <Redirect to="/" />;

    return (
      <div className={`SignUp ${classes.root}`}>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <div className={classes.textField}>
            <TextField
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

          <div className={classes.textField}>
            <TextField
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
              label="Add to Player List"
              control={
                <Checkbox
                  type="checkbox"
                  name="addToPlayerList"
                  color="primary"
                  checked={this.state.addToPlayerList}
                  onChange={this.handleChange}
                />
              }
            />
          </div>

          <div className={classes.textField}>
            <TextField
              placeholder="Number"
              type="number"
              name="number"
              variant="outlined"
              value={this.state.number}
              max="99"
              min="0"
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.textField}>
            <TextField
              label="Position"
              select
              SelectProps={{ native: true }}
              name="position"
              variant="outlined"
              value={this.state.position}
              onChange={this.handleChange}
            >
              <option defaultValue="C">C</option>
              <option value="RW">RW</option>
              <option value="LW">LW</option>
              <option value="D">D</option>
              <option value="G">G</option>
            </TextField>
          </div>

          <div className={classes.textField}>
            <TextField
              label="Shoots"
              select
              SelectProps={{ native: true }}
              name="shoots"
              variant="outlined"
              value={this.state.shoots}
              onChange={this.handleChange}
            >
              <option defaultValue="Right">Right</option>
              <option value="Left">Left</option>
            </TextField>
          </div>

          <div className={classes.button}>
            <Button type="submit" color="primary" variant="outlined">
              Sign Up
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
)(withStyles(styles)(SignUp));
