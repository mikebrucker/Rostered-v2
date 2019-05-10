import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import { DatePicker } from "material-ui-pickers";

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
    margin: theme.spacing.unit
  }
});

class AddSchedule extends Component {
  state = {
    season: "",
    startDate: new Date(),
    current: false,
    showForm: false
  };

  focusInput = React.createRef();

  handleChange = e => {
    const value = e.target
      ? e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value
      : e._d;

    const name = e.target ? e.target.name : "startDate";

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;

    if (userId && teamId && this.state.season.length > 0) {
      const scheduleId = createId("schedule-");

      const scheduleToBeAdded = {
        id: scheduleId,
        teamId,
        season: this.state.season,
        startDate: this.state.startDate,
        current: this.state.current
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          schedules: this.props.firestore.FieldValue.arrayUnion(
            scheduleToBeAdded
          )
        });

      const today = new Date();
      today.setHours(12, 0, 0, 0);

      this.setState(
        {
          season: "",
          startDate: today,
          current: false,
          showForm: false
        },
        () => this.handleShowForm()
      );
    }
  };

  handleShowForm = () => {
    if (this.state.showForm) {
      this.setState({
        showForm: false
      });
    } else {
      this.focusInput.current.focus();

      const today = new Date();
      today.setHours(12, 0, 0, 0);

      this.setState({
        season: "",
        startDate: today,
        current: false,
        showForm: true
      });
    }
  };

  render() {
    const { team, classes } = this.props;

    if (team) {
      return (
        <div className={`AddSchedule ${classes.root}`}>
          <Button
            className={classes.button}
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Schedule
          </Button>
          <Collapse in={this.state.showForm}>
            <form onSubmit={this.handleSubmit}>
              <div className={classes.textField}>
                <TextField
                  inputProps={{ ref: this.focusInput }}
                  fullWidth
                  label="Season Name"
                  placeholder="Season Name"
                  type="text"
                  name="season"
                  variant="outlined"
                  value={this.state.season}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <DatePicker
                  fullWidth
                  keyboard
                  autoOk
                  label="Start Date"
                  name="startDate"
                  format="MM-DD-YYYY"
                  variant="outlined"
                  value={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <FormControlLabel
                  label="Current Season"
                  control={
                    <Checkbox
                      color="primary"
                      type="checkbox"
                      name="current"
                      checked={this.state.current}
                      onChange={this.handleChange}
                    />
                  }
                />
              </div>

              <div>
                <Fab
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="extended"
                >
                  <AddIcon /> Add Schedule
                </Fab>
              </div>
            </form>
          </Collapse>
        </div>
      );
    } else {
      return <div className="AddSchedule">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddSchedule));
