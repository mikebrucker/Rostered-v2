import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
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

class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    number: "",
    position: "C",
    shoots: "Right",
    showForm: false
  };

  focusInput = React.createRef();

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
    console.log(this.state.number);
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
      this.focusInput.current.focus();

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

    const importPlayerFromAnotherTeam = (
      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Import Player"
          name="import"
          variant="outlined"
          helperText="Import Player From Another Team"
          select
          SelectProps={{ native: true }}
          defaultValue="default"
          onChange={this.handleImportPlayerFromAnotherTeam}
        >
          <option value="default">Import Other Player</option>
          {importablePlayers && importablePlayers.length > 0 ? (
            importablePlayers.map(player => (
              <option key={player.id} value={JSON.stringify(player)}>
                {player.firstName} {player.lastName}
              </option>
            ))
          ) : (
            <option value="none" disabled>
              No Other Players
            </option>
          )}
        </TextField>
      </div>
    );

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
            <form onSubmit={this.handleSubmit}>
              <div className={classes.textField}>
                <TextField
                  inputProps={{ ref: this.focusInput }}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  fullWidth
                  label="Number"
                  variant="outlined"
                  placeholder="Number"
                  type="number"
                  name="number"
                  min="0"
                  max="99"
                  value={this.state.number}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    )
                  }}
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  variant="outlined"
                  helperText="Select Position"
                  select
                  SelectProps={{ native: true }}
                  value={this.state.position}
                  onChange={this.handleChange}
                >
                  <option defaultValue="C">C</option>
                  <option value="RW">RW</option>
                  <option value="LW">LW</option>
                  <option value="D">D</option>
                  <option value="G">G</option>
                </TextField>
              </div>

              <div className={classes.textField}>
                <TextField
                  fullWidth
                  label={this.state.position === "G" ? "Catches" : "Shoots"}
                  name="shoots"
                  variant="outlined"
                  helperText="Right-handed or Left-handed"
                  select
                  SelectProps={{ native: true }}
                  value={this.state.shoots}
                  onChange={this.handleChange}
                >
                  <option defaultValue="Right">Right</option>
                  <option value="Left">Left</option>
                </TextField>
              </div>

              <div>
                <Fab
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="extended"
                >
                  <AddIcon />
                  Add New Player
                </Fab>
              </div>
              {importPlayerFromAnotherTeam}
            </form>
          </Collapse>
        </div>
      );
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddPlayer));
