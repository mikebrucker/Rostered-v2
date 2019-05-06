import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "material-ui-pickers";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  textField: {
    padding: theme.spacing.unit
  },
  button: {
    padding: theme.spacing.unit
  }
});

class AddGame extends Component {
  state = {
    opponent: "",
    dateTime: new Date()
  };

  handleChange = e => {
    const value = e.target ? e.target.value : e._d;

    const name = e.target ? e.target.name : "dateTime";

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;
    const scheduleId = this.props.schedule ? this.props.schedule.id : null;

    if (userId && teamId && scheduleId && this.state.opponent.length > 0) {
      const gameId = "game" + createId();

      const gameToBeAdded = {
        id: gameId,
        teamId,
        scheduleId,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          games: this.props.firestore.FieldValue.arrayUnion(gameToBeAdded)
        });

      this.setState({
        opponent: "",
        dateTime: new Date()
      });
    }
  };

  render() {
    const { schedule, classes } = this.props;

    if (schedule) {
      return (
        <div className={`AddGame ${classes.root}`}>
          <h3>ADDGAME</h3>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.textField}>
              <TextField
                label="Opponent"
                placeholder="Opponent"
                type="text"
                name="opponent"
                variant="outlined"
                value={this.state.opponent}
                onChange={this.handleChange}
              />
            </div>

            <div className={classes.textField}>
              <DateTimePicker
                autoOk
                keyboard
                label="Date and Time"
                name="time"
                format="MM-DD-YYYY hh:mm A"
                variant="outlined"
                minutesStep={5}
                value={this.state.dateTime}
                onChange={this.handleChange}
              />
            </div>

            <div className={classes.button}>
              <Button type="submit" color="primary" variant="outlined">
                Add Game
              </Button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="AddGame">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddGame));
