import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    padding: theme.spacing.unit
  }
});

class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    number: "",
    position: "C",
    shoots: "Right"
  };

  showForm = React.createRef();

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? this.props.team.id : null;

    if (
      userId &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.number.length > 0
    ) {
      const playerId = createId("player-");

      const playerToBeAdded = teamId
        ? {
            id: playerId,
            teamId,
            ...this.state
          }
        : {
            id: playerId,
            ...this.state
          };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          players: this.props.firestore.FieldValue.arrayUnion(playerToBeAdded)
        });

      this.setState(
        {
          firstName: "",
          lastName: "",
          number: "",
          position: "C",
          shoots: "Right"
        },
        () => this.handleShowForm()
      );
    }
  };

  handleShowForm = () => {
    if (this.showForm.current.style.display === "none") {
      this.showForm.current.style.display = "block";
      this.setState({
        firstName: "",
        lastName: "",
        number: "",
        position: "C",
        shoots: "Right"
      });
    } else {
      this.showForm.current.style.display = "none";
    }
  };

  render() {
    const { team, classes } = this.props;

    if (team) {
      return (
        <div className={`AddPlayer ${classes.root}`}>
          <Button
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Player to {team.teamName}
          </Button>
          <form
            style={{ display: "none" }}
            ref={this.showForm}
            onSubmit={this.handleSubmit}
          >
            <div className={classes.textField}>
              <TextField
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

            <div className={classes.button}>
              <Button type="submit" color="primary" variant="contained">
                Add New Player
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddPlayer));
