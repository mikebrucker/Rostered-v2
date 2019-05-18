import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import PlayerForm from "./PlayerForm";
import Collapse from "@material-ui/core/Collapse";

class EditPlayer extends Component {
  state = {
    firstName: this.props.player.firstName,
    lastName: this.props.player.lastName,
    number: this.props.player.number,
    position: this.props.player.position,
    shoots: this.props.player.shoots
  };

  handleChange = e => {
    // This is only done to make the label on material ui component not overlap outline
    // label on position input is either catches or shoots depending on if player is goalie or not
    // if Goalie is selected "Shoots" switches to "Catches" and will overlap if this is not done
    if (e.target.name === "position" && e.target.value === "G") {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () =>
          this.setState({
            shoots: this.state.shoots
          })
      );
    } else if (e.target.name === "position" && e.target.value !== "G") {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () =>
          this.setState({
            shoots: this.state.shoots
          })
      );
    } else if (e.target.type === "number") {
      if (e.target.value >= 0 && e.target.value < 100)
        this.setState({
          [e.target.name]: e.target.value
        });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const player = this.props.player ? this.props.player : null;

    if (
      userId &&
      player &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.number.length > 0
    ) {
      const playerToBeEdited = {
        ...player,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          players: this.props.firestore.FieldValue.arrayRemove(player)
        })
        .then(() => {
          this.props.firestore
            .collection("users")
            .doc(userId)
            .update({
              players: this.props.firestore.FieldValue.arrayUnion(
                playerToBeEdited
              )
            });
        });
    }
  };

  render() {
    const { showForm } = this.props;

    return (
      <Collapse in={showForm}>
        <PlayerForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Collapse>
    );
  }
}

export default firestoreConnect()(EditPlayer);
