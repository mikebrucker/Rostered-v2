import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";
import Loading from "../../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
  score: {
    display: "inline-block",
    padding: theme.spacing.unit,
    maxWidth: theme.spacing.unit * 14
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

  focusInput = React.createRef();

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
      this.focusInput.current.focus();

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
                  // keyboard
                  label="Date and Time"
                  name="time"
                  format="MM-DD-YYYY hh:mm A"
                  variant="outlined"
                  minutesStep={5}
                  value={this.state.dateTime}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <FormControlLabel
                  label="Game Over"
                  control={
                    <Checkbox
                      color="primary"
                      type="checkbox"
                      name="gameOver"
                      checked={this.state.gameOver}
                      onChange={this.handleChange}
                    />
                  }
                />
              </div>

              <Collapse in={this.state.gameOver}>
                <Typography variant="subtitle2" color="textSecondary">
                  Score
                </Typography>
                <div className={classes.textField}>
                  <div className={classes.score}>
                    <TextField
                      label={team.teamName}
                      variant="outlined"
                      placeholder="Score"
                      type="number"
                      name="myScore"
                      min="0"
                      max="99"
                      InputLabelProps={{ shrink: true }}
                      value={this.state.myScore}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className={classes.score}>
                    <TextField
                      label={
                        this.state.opponent.length > 0
                          ? this.state.opponent
                          : "Enemy"
                      }
                      variant="outlined"
                      placeholder="Score"
                      type="number"
                      name="enemyScore"
                      min="0"
                      max="99"
                      InputLabelProps={{ shrink: true }}
                      value={this.state.enemyScore}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Collapse>

              <div>
                <Fab
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="extended"
                >
                  <AddIcon />
                  Add Game
                </Fab>
              </div>
            </form>
          </Collapse>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddGame));
