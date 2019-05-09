import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

class AddTeam extends Component {
  state = {
    teamName: "",
    division: "",
    arena: "",
    sport: "Hockey",
    showForm: false
  };

  focusInput = React.createRef();

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

      this.setState(
        {
          teamName: "",
          division: "",
          arena: "",
          sport: "Hockey",
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

      // Setting state when showing form is only way to make MUI labels work correctly on TextFields if display is initially none
      this.setState({
        teamName: "",
        division: "",
        arena: "",
        sport: "Hockey",
        showForm: true
      });
    }
  };

  render() {
    const { user, classes } = this.props;

    if (user) {
      return (
        <div className="AddTeam">
          <Button
            className={classes.button}
            onClick={this.handleShowForm}
            color="secondary"
            variant="outlined"
          >
            Add Team
          </Button>
          <Collapse in={this.state.showForm}>
            <form onSubmit={this.handleSubmit}>
              <div className={classes.textField}>
                <TextField
                  inputProps={{ ref: this.focusInput }}
                  fullWidth
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
                  fullWidth
                  label="Division"
                  placeholder="Division"
                  type="text"
                  name="division"
                  variant="outlined"
                  value={this.state.division}
                  onChange={this.handleChange}
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  fullWidth
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
                  fullWidth
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

              <div>
                <Button
                  className={classes.button}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Add Team
                </Button>
              </div>
            </form>
          </Collapse>
        </div>
      );
    } else {
      return <div className="AddTeam">Loading...</div>;
    }
  }
}

export default firestoreConnect()(withStyles(styles)(AddTeam));
