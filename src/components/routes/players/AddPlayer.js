import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

class AddPlayerToBank extends Component {
  state = {
    firstName: "",
    lastName: "",
    number: "",
    position: "C",
    shoots: "Right"
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
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.number.length > 0
    ) {
      const playerId = createId();

      const playerToBeAdded = {
        id: playerId,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          players: this.props.firestore.FieldValue.arrayUnion(playerToBeAdded)
        });

      this.setState({
        firstName: "",
        lastName: "",
        number: "",
        position: "C",
        shoots: "Right"
      });
    }
  };

  render() {
    const { unauthorized, loaded } = this.props;
    if (loaded && unauthorized) return <Redirect to="/login" />;

    return (
      <div className="AddPlayerToBank">
        <h1>ADDPLAYERTOBANK</h1>
        <h2>Add Player to Player Bank</h2>
        <form onSubmit={this.handleSubmit} className="">
          <div className="">
            <label htmlFor="firstName">First Name</label>
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="lastName">Last Name</label>
            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="number">Number</label>
            <input
              placeholder="Number"
              type="number"
              name="number"
              min="0"
              max="99"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="position">Position</label>
            <select
              className=""
              name="position"
              value={this.state.position}
              onChange={this.handleChange}
            >
              <option defaultValue="C">C</option>
              <option value="RW">RW</option>
              <option value="LW">LW</option>
              <option value="D">D</option>
              <option value="G">G</option>
            </select>
          </div>

          <div>
            <label htmlFor="shoots">Shoots</label>
            <select
              className=""
              name="shoots"
              value={this.state.shoots}
              onChange={this.handleChange}
            >
              <option defaultValue="Right">Right</option>
              <option value="Left">Left</option>
            </select>
          </div>

          <div className="">
            <button className="">Submit</button>
          </div>
        </form>
      </div>
    );
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
)(AddPlayerToBank);
