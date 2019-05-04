import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../../helpers/createId";

class AddSchedule extends Component {
  state = {
    season: "",
    startDate: "",
    current: false
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

    if (
      userId &&
      teamId &&
      this.state.season.length > 0 &&
      this.state.startDate.length > 0
    ) {
      const scheduleId = createId();

      const scheduleToBeAdded = {
        id: scheduleId,
        ...this.state
      };

      const thisUser = this.props.firestore.collection("users").doc(userId);
      thisUser.get().then(doc => {
        const user = doc.data();

        const otherTeams =
          user && user.teams
            ? user.teams.filter(team => team.id !== teamId)
            : null;

        const thisTeam =
          user && user.teams
            ? user.teams.filter(team => team.id === teamId)[0]
            : null;

        const thisTeamSchedules =
          thisTeam && thisTeam.schedules ? thisTeam.schedules : null;

        const thisTeamSchedulesCurrentToFalse =
          thisTeam && this.state.current && thisTeam.schedules
            ? thisTeam.schedules.map(schedule => {
                return { ...schedule, current: false };
              })
            : null;

        const otherSchedules = thisTeamSchedulesCurrentToFalse
          ? thisTeamSchedulesCurrentToFalse
          : thisTeamSchedules;

        const thisTeamWithNewSchedule = otherSchedules
          ? {
              ...thisTeam,
              schedules: [...otherSchedules, scheduleToBeAdded]
            }
          : {
              ...thisTeam,
              schedules: [scheduleToBeAdded]
            };

        const teams = otherTeams
          ? [...otherTeams, thisTeamWithNewSchedule]
          : [thisTeamWithNewSchedule];

        thisUser.set({ teams });
      });

      this.setState({
        season: "",
        current: false
      });
    }
  };

  render() {
    const { team } = this.props;

    if (team) {
      return (
        <div className="AddSchedule">
          <h2>ADDSCHEDULE</h2>
          <form onSubmit={this.handleSubmit} className="">
            <div className="">
              <label htmlFor="season">Season Name</label>
              <input
                placeholder="Season Name"
                type="text"
                name="season"
                value={this.state.season}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="startDate">Start Date</label>
              <input
                placeholder="Start Date"
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="current">Current Season</label>
              <input
                type="checkbox"
                name="current"
                checked={this.state.current}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <button className="">Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="AddSchedule">Loading...</div>;
    }
  }
}

export default firestoreConnect()(AddSchedule);
