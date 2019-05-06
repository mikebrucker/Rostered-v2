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
    padding: theme.spacing.unit
  },
  button: {
    padding: theme.spacing.unit
  }
});

class AddTeam extends Component {
  state = {
    teamName: "",
    league: "",
    arena: "",
    sport: "Hockey"
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
      this.state.teamName.length > 0 &&
      this.state.league.length > 0 &&
      this.state.arena.length > 0
    ) {
      const teamId = "team" + createId();

      const teamToBeAdded = {
        id: teamId,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          teams: this.props.firestore.FieldValue.arrayUnion(teamToBeAdded)
        });

      this.setState({
        teamName: "",
        league: "",
        arena: "",
        sport: "Hockey"
      });
    }
  };

  render() {
    const { user, classes } = this.props;

    if (user) {
      return (
        <div className="AddTeam">
          <h1>ADDTEAM</h1>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.textField}>
              <TextField
                label="Team Name"
                placeholder="Team Name"
                type="text"
                name="teamName"
                variant="outlined"
                value={this.state.teamName}
                onChange={this.handleChange}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="League"
                placeholder="League"
                type="text"
                name="league"
                variant="outlined"
                value={this.state.league}
                onChange={this.handleChange}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Arena"
                placeholder="Arena"
                type="text"
                name="arena"
                variant="outlined"
                value={this.state.arena}
                onChange={this.handleChange}
              />
            </div>

            <div className={classes.textField}>
              <TextField
                label="Sport"
                name="sport"
                variant="outlined"
                select
                SelectProps={{ native: true }}
                value={this.state.sport}
                onChange={this.handleChange}
              >
                <option defaultValue="Hockey">Hockey</option>
              </TextField>
            </div>

            <div className={classes.button}>
              <Button type="submit" color="primary" variant="outlined">
                Add Team
              </Button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="AddTeam">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddTeam));
