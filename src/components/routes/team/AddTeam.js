import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import createId from "../../../helpers/createId";
import Loading from "../../utils/Loading";
import TeamForm from "./TeamForm";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const styles = theme => ({
  font: {
    fontFamily: "Righteous, sans-serif",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
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
    importTeam: "",
    loading: false,
    error: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ""
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
        importTeam: "",
        loading: false,
        error: ""
      });
    }
  };

  handleImportSubmit = e => {
    e.preventDefault();
    const userId = this.props.user ? this.props.user.id : null;
    const teams = this.props.teams ? this.props.teams : null;

    const teamToImport = this.props.teamExports
      ? this.props.teamExports.filter(
          item => item.code === this.state.importTeam
        )[0]
      : null;

    const teamAlreadyImported =
      teams && teamToImport
        ? teams.filter(item => item.id === teamToImport.teams[0].id).length
        : null;

    if (teamToImport.ownerId === userId) {
      this.setState({
        error: "Cannot Import Your Own Team"
      });
    } else if (teamToImport && !teamAlreadyImported) {
      this.setState({ loading: true });

      this.props.firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          const user = doc.data();
          const teams = user && user.teams ? user.teams : [];
          const schedules = user && user.schedules ? user.schedules : [];
          const games = user && user.games ? user.games : [];
          const players = user && user.players ? user.players : [];

          this.props.firestore
            .collection("users")
            .doc(userId)
            .update({
              teams: [...teams, ...teamToImport.teams],
              schedules: [...schedules, ...teamToImport.schedules],
              games: [...games, ...teamToImport.games],
              players: [...players, ...teamToImport.players]
            })
            .then(() => this.setState({ loading: false }));
        });

      // const types = ["teams", "schedules", "games", "players"];

      // types.forEach(type => {
      //   teamToImport[type].forEach(item => {
      //     this.props.firestore
      //       .collection("users")
      //       .doc(userId)
      //       .update({
      //         [type]: this.props.firestore.FieldValue.arrayUnion(item)
      //       });
      //   });
      // });
    } else if (teamAlreadyImported) {
      this.setState({
        error: "Team Already Imported"
      });
    } else {
      this.setState({
        error: "Invalid Code"
      });
    }
  };

  render() {
    const { user, classes } = this.props;

    const importLoading = this.state.loading ? <Loading /> : "";

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

          <form onSubmit={this.handleImportSubmit}>
            <div className={classes.textField}>
              <TextField
                fullWidth
                label="Import Team"
                placeholder="Import Team"
                helperText="Enter Code to Import Team"
                type="text"
                name="importTeam"
                variant="outlined"
                value={this.state.importTeam}
                onChange={this.handleChange}
                disabled={this.state.loading}
              />

              <Typography color="error">{this.state.error}</Typography>

              <Fab
                className={classes.button}
                disabled={this.state.loading}
                type="submit"
                color="primary"
                variant="extended"
              >
                <ImportExportIcon />
                Import Team
              </Fab>
              {importLoading}
            </div>
          </form>
        </div>
      );
    } else {
      return <Loading fixed />;
    }
  }
}

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => {
  const teamExports =
    ordered && ordered.teamExports ? ordered.teamExports : null;
  return {
    auth,
    teamExports
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [{ collection: "teamExports" }];
  })
)(withStyles(styles)(AddTeam));
