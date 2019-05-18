import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import Collapse from "@material-ui/core/Collapse";
import ResultForm from "./ResultForm";

class AddResult extends Component {
  state = {
    gameOver: this.props.game.gameOver,
    myScore: this.props.game.myScore,
    enemyScore: this.props.game.enemyScore
  };

  handleChange = e => {
    const value =
      e.target && e.target.type === "checkbox"
        ? e.target.checked
        : e.target
        ? e.target.value
        : e._d;

    const name = e.target ? e.target.name : "dateTime";

    if (
      e.target &&
      e.target.type &&
      e.target.type === "checkbox" &&
      !e.target.checked
    ) {
      this.setState({
        myScore: "",
        enemyScore: "",
        [name]: value
      });
    } else if (e.target && e.target.type && e.target.type === "number") {
      if (this.state.gameOver) {
        if (e.target.value >= 0 && e.target.value < 100)
          this.setState({
            [name]: value
          });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const game = this.props.game ? this.props.game : null;
    const gameOverNeedsScore = this.state.gameOver
      ? this.state.myScore.length > 0 && this.state.enemyScore.length > 0
      : true;

    if (userId && game && gameOverNeedsScore) {
      const gameToBeEdited = {
        ...game,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          games: this.props.firestore.FieldValue.arrayRemove(game)
        })
        .then(() => {
          this.props.firestore
            .collection("users")
            .doc(userId)
            .update({
              games: this.props.firestore.FieldValue.arrayUnion(gameToBeEdited)
            });
        });
    }
  };

  render() {
    const { game, showForm } = this.props;

    return (
      <Collapse in={showForm}>
        <ResultForm
          state={this.state}
          game={game}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Collapse>
    );
  }
}

export default firestoreConnect()(AddResult);
