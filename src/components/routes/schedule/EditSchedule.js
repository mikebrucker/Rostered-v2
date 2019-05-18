import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import ScheduleForm from "./ScheduleForm";
import Collapse from "@material-ui/core/Collapse";

class EditSchedule extends Component {
  state = {
    season: this.props.schedule.season,
    current: this.props.schedule.current
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
    const schedule = this.props.schedule ? this.props.schedule : null;
    const teamId = this.props.schedule ? this.props.schedule.teamId : null;

    if (userId && schedule && this.state.season.length > 0) {
      const scheduleToBeEdited = {
        ...schedule,
        ...this.state
      };

      // figure out this logic after work
      if (this.state.current && !schedule.current) {
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
                schedules: this.props.firestore.FieldValue.arrayRemove(schedule)
              })
              .then(() => {
                this.props.firestore
                  .collection("users")
                  .doc(userId)
                  .update({
                    schedules: [
                      ...otherSchedules,
                      ...teamSchedulesRemoveCurrent,
                      scheduleToBeEdited
                    ]
                  });
              });
          });
      } else {
        this.props.firestore
          .collection("users")
          .doc(userId)
          .update({
            schedules: this.props.firestore.FieldValue.arrayRemove(schedule)
          })
          .then(() => {
            this.props.firestore
              .collection("users")
              .doc(userId)
              .update({
                schedules: this.props.firestore.FieldValue.arrayUnion(
                  scheduleToBeEdited
                )
              });
          });
      }
    }
  };

  render() {
    const { schedule, showForm } = this.props;

    return (
      <Collapse in={showForm}>
        <ScheduleForm
          state={this.state}
          schedule={schedule}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Collapse>
    );
  }
}

export default firestoreConnect()(EditSchedule);
