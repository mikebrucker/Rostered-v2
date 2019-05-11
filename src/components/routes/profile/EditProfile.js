import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";

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

class EditProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    themeColor: JSON.stringify(deepOrange),
    showForm: false,
    error: null
  };

  focusInput = React.createRef();

  // componentDidMount() {
  //   this.setState({
  //     firstName: this.props.user.firstName,
  //     lastName: this.props.user.lastName,
  //     themeColor: this.props.user.themeColor
  //   });
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.themeColor
    ) {
      const updatedProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        themeColor: this.state.themeColor
      };

      this.props.firebase.updateProfile(updatedProfile);
    } else {
      this.setState({
        error: "Fields cannot be blank"
      });
    }
  };

  handleShowForm = () => {
    if (this.state.showForm) {
      this.setState({
        showForm: false
      });
    } else {
      this.focusInput.current.focus();

      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        themeColor: this.props.user.themeColor,
        showForm: true
      });
    }
  };

  render() {
    const { classes } = this.props;

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
      <div className={`Edit Profile ${classes.root}`}>
        <Button
          onClick={this.handleShowForm}
          variant="outlined"
          color="secondary"
        >
          Edit Profile
        </Button>
        <Collapse in={this.state.showForm}>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.textField}>
              <TextField
                inputProps={{ ref: this.focusInput }}
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
              <Fab type="submit" color="primary" variant="extended">
                <EditIcon />
                Edit Profile
              </Fab>
              <div>{this.state.error ? <p>{this.state.error}</p> : null}</div>
            </div>
          </form>
        </Collapse>
      </div>
    );
  }
}

export default firebaseConnect()(withStyles(styles)(EditProfile));
