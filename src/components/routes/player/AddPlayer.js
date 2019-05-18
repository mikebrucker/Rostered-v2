import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";
import PlayerForm from "./PlayerForm";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    number: "",
    position: "C",
    shoots: "Right",
    showForm: false
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
    const teamId = this.props.team ? this.props.team.id : null;

    if (
      userId &&
      teamId &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.number.length > 0
    ) {
      const playerId = createId("player-");

      const playerToBeAdded = {
        id: playerId,
        teamId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        number: this.state.number,
        position: this.state.position,
        shoots: this.state.shoots
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          players: this.props.firestore.FieldValue.arrayUnion(playerToBeAdded)
        });

      this.handleShowForm();
    }
  };

  handleShowForm = () => {
    // state is set here because labels will overlap outlined component
    // if form is not hidden from the start this behavior does not happen
    if (this.state.showForm) {
      this.setState({
        firstName: "",
        lastName: "",
        number: "",
        position: "C",
        shoots: "Right",
        showForm: false
      });
    } else {
      this.setState({
        firstName: "",
        lastName: "",
        number: "",
        position: "C",
        shoots: "Right",
        showForm: true
      });
    }
  };

  handleImportPlayerFromAnotherTeam = e => {
    if (e.target.value !== "default") {
      const importedPlayer = JSON.parse(e.target.value);

      this.setState({
        firstName: importedPlayer.firstName,
        lastName: importedPlayer.lastName,
        number: importedPlayer.number,
        position: importedPlayer.position,
        shoots: importedPlayer.shoots
      });
      e.target.value = "default";
    }
  };

  render() {
    const { team, importablePlayers, classes } = this.props;

    if (team) {
      return (
        <div className={`AddPlayer ${classes.root}`}>
          <Button
            className={classes.button}
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Player to {team.teamName}
          </Button>
          <Collapse in={this.state.showForm}>
            <PlayerForm
              add
              state={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              importablePlayers={importablePlayers}
              handleImportPlayerFromAnotherTeam={
                this.handleImportPlayerFromAnotherTeam
              }
            />
          </Collapse>
        </div>
      );
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddPlayer));
