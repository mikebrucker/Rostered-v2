import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
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

class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    number: "",
    position: "C",
    shoots: "Right"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teamId = this.props.team ? [this.props.team.id] : null;

    if (
      userId &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.number.length > 0
    ) {
      const playerId = createId();

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

      this.setState({
        firstName: "",
        lastName: "",
        number: "",
        position: "C",
        shoots: "Right"
      });
    }
  };

  render() {
    const { unauthorized, loaded, team, classes } = this.props;
    if (loaded && unauthorized) return <Redirect to="/login" />;

    const whereToAddPlayer = team
      ? `Add Player to ${team.teamName}`
      : "Add Player to Player Bank";

    return (
      <div className={`AddPlayer ${classes.root}`}>
        <h2>{whereToAddPlayer}</h2>
        <form onSubmit={this.handleSubmit} className="">
          <div className={classes.textField}>
            <TextField
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
              label="Shoots"
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
            <Button type="submit" color="primary" variant="outlined">
              Add Player
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => ({
  auth,
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  user: ordered.users && ordered.users[0]
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.auth.uid }];
  })
)(withStyles(styles)(AddPlayer));
