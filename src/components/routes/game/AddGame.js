import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";
import Loading from "../../utils/Loading";
import GameForm from "./GameForm";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary[50]
  },
  button: {
    margin: theme.spacing.unit
  }
});

class AddGame extends Component {
  state = {
    opponent: "",
    dateTime: new Date(),
    gameOver: false,
    myScore: "",
    enemyScore: "",
    showForm: false
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
      if (e.target.value >= 0 && e.target.value < 100)
        this.setState({
          [name]: value
        });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;
    const scheduleId = this.props.schedule ? this.props.schedule.id : null;
    const gameOverNeedsScore = this.state.gameOver
      ? this.state.myScore.length > 0 && this.state.enemyScore.length > 0
      : true;

    if (
      userId &&
      teamId &&
      scheduleId &&
      this.state.opponent.length > 0 &&
      gameOverNeedsScore
    ) {
      const gameId = createId("game-");

      const gameToBeAdded = {
        id: gameId,
        teamId,
        scheduleId,
        teamName: this.props.team.teamName,
        opponent: this.state.opponent,
        dateTime: this.state.dateTime,
        gameOver: this.state.gameOver,
        myScore: this.state.myScore,
        enemyScore: this.state.enemyScore
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          games: this.props.firestore.FieldValue.arrayUnion(gameToBeAdded)
        });

      this.handleShowForm();
    }
  };

  handleShowForm = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    if (this.state.showForm) {
      this.setState({
        opponent: "",
        dateTime: today,
        gameOver: false,
        myScore: "",
        enemyScore: "",
        showForm: false
      });
    } else {
      this.setState({
        opponent: "",
        dateTime: today,
        gameOver: false,
        myScore: "",
        enemyScore: "",
        showForm: true
      });
    }
  };

  render() {
    const { schedule, team, classes } = this.props;

    if (schedule && team) {
      return (
        <div className={`AddGame ${classes.root}`}>
          <Button
            className={classes.button}
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Game
          </Button>
          <Collapse in={this.state.showForm}>
            <GameForm
              add
              state={this.state}
              schedule={schedule}
              team={team}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Collapse>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddGame));
