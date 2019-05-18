import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import createId from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loading from "../../utils/Loading";
import TeamForm from "./TeamForm";

const styles = theme => ({
  font: {
    fontFamily: "Righteous, sans-serif",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class AddTeam extends Component {
  state = {
    teamName: "",
    division: "",
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
      this.state.division.length > 0 &&
      this.state.arena.length > 0
    ) {
      const teamId = createId("team-");

      const teamToBeAdded = {
        id: teamId,
        teamName: this.state.teamName,
        division: this.state.division,
        arena: this.state.arena,
        sport: this.state.sport
      };

      this.props.firestore
        .collection("users")
        .doc(userId)
        .update({
          teams: this.props.firestore.FieldValue.arrayUnion(teamToBeAdded)
        });

      this.setState({
        teamName: "",
        division: "",
        arena: "",
        sport: "Hockey",
        showForm: false
      });
    }
  };

  render() {
    const { user, classes } = this.props;
    if (user) {
      return (
        <div className="AddTeam">
          <Typography className={classes.font} color="secondary" variant="h4">
            Add a New Team
          </Typography>
          <TeamForm
            add
            state={this.state}
            user={user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      );
    } else {
      return <Loading fixed />;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddTeam));
