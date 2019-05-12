import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { themeColors } from "../../../material-ui-theme/theme";

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

      this.handleShowForm();
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
