import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../../../helpers/createId";

class AddGame extends Component {
  state = {
    opponent: "",
    time: "",
    date: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;
    const scheduleId = this.props.schedule ? this.props.schedule.id : null;

    if (
      userId &&
      teamId &&
      scheduleId &&
      this.state.opponent.length > 0 &&
      this.state.time.length > 0 &&
      this.state.date.length > 0
    ) {
      const gameId = createId();

      const gameToBeAdded = {
        id: gameId,
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

        const thisSchedule =
          thisTeam && thisTeam.schedules
            ? thisTeam.schedules.filter(
                schedule => schedule.id === scheduleId
              )[0]
            : null;

        const otherSchedules =
          thisTeam && thisTeam.schedules
            ? thisTeam.schedules.filter(schedule => schedule.id !== scheduleId)
            : null;

        // put logic here to add game to schedule then on to teams

        // thisUser.set({ teams });
      });

      this.setState({
        opponent: "",
        time: "",
        date: ""
      });
    }
  };

  render() {
    const { schedule } = this.props;

    if (schedule) {
      return (
        <div className="AddGame">
          <h3>ADDGAME</h3>
          <form onSubmit={this.handleSubmit} className="">
            <div className="">
              <label htmlFor="opponent">Opponent</label>
              <input
                placeholder="Opponent"
                type="text"
                name="opponent"
                value={this.state.opponent}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="time">Time</label>
              <input
                placeholder="Time"
                type="time"
                name="time"
                step="300"
                value={this.state.time}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="date">Date</label>
              <input
                placeholder="date"
                type="date"
                name="date"
                value={this.state.date}
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
      return <div className="AddGame">Loading...</div>;
    }
  }
}

export default firestoreConnect()(AddGame);
