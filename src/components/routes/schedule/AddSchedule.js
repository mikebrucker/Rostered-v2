import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
    padding: theme.spacing.unit
  }
});

class AddSchedule extends Component {
  state = {
    season: "",
    startDate: null,
    current: false
  };

  showForm = React.createRef();

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
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          schedules: this.props.firestore.FieldValue.arrayUnion(
            scheduleToBeAdded
          )
        });

      this.setState(
        {
          season: "",
          startDate: null,
          current: false
        },
        () => this.handleShowForm()
      );
    }
  };

  handleShowForm = () => {
    if (this.showForm.current.style.display === "none") {
      this.showForm.current.style.display = "block";
      this.setState({
        season: "",
        startDate: null,
        current: false
      });
    } else {
      this.showForm.current.style.display = "none";
    }
  };

  render() {
    const { team, classes } = this.props;

    if (team) {
      return (
        <div className={`AddSchedule ${classes.root}`}>
          <Button
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Schedule
          </Button>
          <form
            style={{ display: "none" }}
            ref={this.showForm}
            onSubmit={this.handleSubmit}
          >
            <div className={classes.textField}>
              <TextField
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

            <div className={classes.button}>
              <Button type="submit" color="primary" variant="contained">
                Add Schedule
              </Button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="AddSchedule">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddSchedule));
