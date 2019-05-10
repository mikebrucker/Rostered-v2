import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { createId } from "../../../helpers/createId";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Loading from "../utils/Loading";

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
    sport: "Hockey"
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

      this.setState({
        teamName: "",
        division: "",
        arena: "",
        sport: "Hockey",
        showForm: false
      });
      if (this.props.location.pathname !== "/") {
        this.props.history.push({ pathname: "/", createdTeam: teamId });
      }
    }
  };

  render() {
    const { user, unauthorized, loaded, classes } = this.props;
    if (loaded && unauthorized) return <Redirect to="/login" />;

    if (user) {
      return (
        <div className="AddTeam">
          <Typography
            className={classes.button}
            // onClick={this.handleShowForm}
            color="secondary"
            variant="h4"
          >
            Add a New Team
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <div className={classes.textField}>
              <TextField
                autoFocus
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
              <Fab
                className={classes.button}
                type="submit"
                color="primary"
                variant="extended"
              >
                <AddIcon /> Add Team
              </Fab>
            </div>
          </form>
        </div>
      );
    } else {
      return <Loading fixed />;
    }
  }
}

const mapStateToProps = ({
  firebase: { auth },
  firestore: { ordered, status }
}) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  return {
    auth,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(withStyles(styles)(AddTeam));
