import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

class AddTeam extends Component {
  state = {
    teamName: "",
    league: "",
    arena: "",
    sport: "Hockey"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;

    if (
      userId &&
      this.state.teamName.length > 0 &&
      this.state.league.length > 0 &&
      this.state.arena.length > 0
    ) {
      const teamId = createId();

      const teamToBeAdded = {
        id: teamId,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          teams: this.props.firestore.FieldValue.arrayUnion(teamToBeAdded)
        });

      this.setState({
        teamName: "",
        league: "",
        arena: "",
        sport: "Hockey"
      });
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className="AddTeam">
          <h1>ADDTEAM</h1>
          <form onSubmit={this.handleSubmit} className="">
            <div className="">
              <label htmlFor="teamName">Team Name</label>
              <input
                placeholder="Team Name"
                type="text"
                name="teamName"
                value={this.state.teamName}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="league">League</label>
              <input
                placeholder="League"
                type="text"
                name="league"
                value={this.state.league}
                onChange={this.handleChange}
              />
            </div>

            <div className="">
              <label htmlFor="arena">Arena</label>
              <input
                placeholder="Arena"
                type="text"
                name="arena"
                value={this.state.arena}
                onChange={this.handleChange}
              />
            </div>

            <label htmlFor="sport">Sport</label>
            <select
              className=""
              name="sport"
              value={this.state.sport}
              onChange={this.handleChange}
            >
              <option defaultValue="Hockey">Hockey</option>
            </select>

            <div className="">
              <button className="">Submit</button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="AddTeam">Loading...</div>;
    }
  }
}

export default firestoreConnect()(AddTeam);
