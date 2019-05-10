import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";
import { DateTimePicker } from "material-ui-pickers";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary[50]
  },
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  button: {
    margin: theme.spacing.unit
  }
});

class AddGame extends Component {
  state = {
    opponent: "",
    dateTime: new Date(),
    showForm: false
  };

  focusInput = React.createRef();

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
      const gameId = createId("game-");

      const gameToBeAdded = {
        id: gameId,
        teamId,
        scheduleId,
        opponent: this.state.opponent,
        dateTime: this.state.dateTime
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          games: this.props.firestore.FieldValue.arrayUnion(gameToBeAdded)
        });

      this.setState(
        {
          opponent: "",
          dateTime: new Date(),
          showForm: false
        },
        () => this.handleShowForm()
      );
    }
  };

  handleShowForm = () => {
    if (this.state.showForm) {
      this.setState({
        showForm: false
      });
    } else {
      this.focusInput.current.focus();

      this.setState({
        opponent: "",
        dateTime: new Date(),
        showForm: true
      });
    }
  };

  render() {
    const { schedule, classes } = this.props;

    if (schedule) {
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
            <form onSubmit={this.handleSubmit}>
              <div className={classes.textField}>
                <TextField
                  inputProps={{ ref: this.focusInput }}
                  fullWidth
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
                  fullWidth
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

              <div>
                <Fab
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="extended"
                >
                  <AddIcon /> Add Game
                </Fab>
              </div>
            </form>
          </Collapse>
        </div>
      );
    } else {
      return <div className="AddGame">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddGame));
