import React, { Component } from "react";
import { connect } from "react-redux";
// import { addTeam } from "../../../store/actions/teamActions";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
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
    if (
      this.state.teamName.length > 0 &&
      this.state.league.length > 0 &&
      this.state.arena.length > 0
    ) {
      const userId = this.props.user ? this.props.user.id : null;
      const teamId = createId();

      const teamToBeAdded = {
        id: teamId,
        teamName: this.state.teamName,
        league: this.state.league,
        arena: this.state.arena,
        sport: this.state.sport
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          teams: this.props.firestore.FieldValue.arrayUnion(teamToBeAdded)
        });
    }

    this.setState({
      teamName: "",
      league: "",
      arena: "",
      sport: "Hockey"
    });
  };

  render() {
    const { unauthorized, loaded } = this.props;
    if (loaded && unauthorized) return <Redirect to="/login" />;

    if (loaded) {
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

            <label className="" htmlFor="sport">
              Sport
            </label>
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

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => ({
  auth,
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  user: ordered.users && ordered.users[0]
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(AddTeam);
