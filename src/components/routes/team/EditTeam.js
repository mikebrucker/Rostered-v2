import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import TeamForm from "./TeamForm";

import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  font: {
    fontFamily: "Righteous, sans-serif",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class EditTeam extends Component {
  state = {
    teamName: this.props.team.teamName,
    division: this.props.team.division,
    arena: this.props.team.arena,
    sport: this.props.team.sport
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const team = this.props.team ? this.props.team : null;

    if (
      userId &&
      team &&
      this.state.teamName.length > 0 &&
      this.state.division.length > 0 &&
      this.state.arena.length > 0
    ) {
      const teamToBeEdited = {
        ...team,
        ...this.state
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          teams: this.props.firestore.FieldValue.arrayRemove(team)
        })
        .then(() => {
          this.props.firestore
            .collection("users")
            .doc(userId)
            .update({
              teams: this.props.firestore.FieldValue.arrayUnion(teamToBeEdited)
            });
        });
    }
  };

  render() {
    const { team, showForm, classes } = this.props;
    return (
      <Collapse in={showForm}>
        <Typography className={classes.font} color="secondary" variant="h4">
          Edit {this.state.teamName}
        </Typography>
        <TeamForm
          state={this.state}
          team={team}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Collapse>
    );
  }
}

export default firestoreConnect()(withStyles(styles)(EditTeam));
