import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";
import ScheduleForm from "./ScheduleForm";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

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
    current: false,
    showForm: false
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
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;

    if (userId && teamId && this.state.season.length > 0) {
      const scheduleId = createId("schedule-");

      const scheduleToBeAdded = {
        id: scheduleId,
        teamId,
        season: this.state.season,
        current: this.state.current
      };

      if (this.state.current) {
        this.props.firestore
          .collection("users")
          .doc(userId)
          .get()
          .then(doc => {
            const user = doc.data();

            const otherSchedules = user.schedules
              ? user.schedules.filter(schedule => schedule.teamId !== teamId)
              : [];

            const teamSchedules = user.schedules
              ? user.schedules.filter(schedule => schedule.teamId === teamId)
              : [];

            const teamSchedulesRemoveCurrent =
              teamSchedules.length > 0
                ? teamSchedules.map(schedule => ({
                    ...schedule,
                    current: false
                  }))
                : [];

            this.props.firestore
              .collection("users")
              .doc(userId)
              .update({
                schedules: [
                  ...otherSchedules,
                  ...teamSchedulesRemoveCurrent,
                  scheduleToBeAdded
                ]
              });
          });
      } else {
        this.props.firestore
          .collection("users")
          .doc(userId)
          .update({
            schedules: this.props.firestore.FieldValue.arrayUnion(
              scheduleToBeAdded
            )
          });
      }

      this.handleShowForm();
    }
  };

  handleShowForm = () => {
    if (this.state.showForm) {
      this.setState({
        season: "",
        current: false,
        showForm: false
      });
    } else {
      this.setState({
        season: "",
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
            <ScheduleForm
              add
              state={this.state}
              team={team}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Collapse>
        </div>
      );
    } else {
      return <div className="AddSchedule">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddSchedule));
