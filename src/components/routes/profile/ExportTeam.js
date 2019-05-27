import React, { Component } from "react";
import createId from "../../../helpers/createId";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Fab from "@material-ui/core/Fab";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteItem from "../../utils/DeleteItem";

const styles = theme => ({
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  button: {
    margin: theme.spacing.unit
  },
  buttons: {
    display: "flex"
  },
  copyButton: {
    marginLeft: "auto",
    background: "linear-gradient(45deg, goldenrod, yellow)"
  },
  card: {
    padding: theme.spacing.unit,
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.secondary[50]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.primary[100]
    }
  }
});

class ExportTeam extends Component {
  state = {
    team: "default",
    successSnackbar: false,
    failureSnackbar: false
  };

  handleChange = e => {
    if (e.target.value !== "default") {
      this.setState({
        [e.target.name]: e.target.value
      });
      e.target.value = "default";
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.team !== "default") {
      const user = this.props.user ? this.props.user : null;
      const myTeam = JSON.parse(this.state.team);
      const code = createId(myTeam.teamName.replace(/\s/g, "") + "_", null, 6);

      const mySchedules =
        user && user.schedules && user.schedules.length > 0
          ? user.schedules.filter(item => item.teamId === myTeam.id)
          : [];
      const myGames =
        user && user.games && user.games.length > 0
          ? user.games.filter(item => item.teamId === myTeam.id)
          : [];
      const myPlayers =
        user && user.players && user.players.length > 0
          ? user.players.filter(item => item.teamId === myTeam.id)
          : [];

      const exportTeam = {
        code,
        ownerId: user.id,
        teams: [myTeam],
        schedules: mySchedules,
        games: myGames,
        players: myPlayers
      };

      console.log(exportTeam);

      this.props.firestore.collection("teamExports").add(exportTeam);
    }
  };

  copyText = text => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.contentEditable = true;
    textArea.readOnly = false;
    textArea.setAttribute("contenteditable", true); // Make it editable for iOS
    textArea.setAttribute("readonly", false); // Make it readonly false for iOS compatability
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 999999);

    try {
      document.execCommand("copy");
      this.setState({ successSnackbar: true });
    } catch (err) {
      this.setState({ failureSnackbar: true });
    }

    document.body.removeChild(textArea);
  };

  deleteExportedTeam = id => {
    this.props.firestore
      .collection("teamExports")
      .doc(id)
      .delete();
  };

  render() {
    const { user, teamExports, classes } = this.props;
    const teams = user && user.teams && user.teams.length > 0 ? user.teams : [];

    return (
      <div className="ExportTeam">
        <form onSubmit={this.handleSubmit}>
          <div className={classes.textField}>
            <TextField
              fullWidth
              label="Export Team"
              name="team"
              variant="outlined"
              helperText="Export Team For Another User to Download"
              select
              SelectProps={{ native: true }}
              value={this.state.team}
              onChange={this.handleChange}
            >
              <option value="default">Export Team</option>
              {teams && teams.length > 0 ? (
                teams.map(team => (
                  <option key={team.id} value={JSON.stringify(team)}>
                    {team.teamName}
                  </option>
                ))
              ) : (
                <option value="none" disabled>
                  No Teams
                </option>
              )}
            </TextField>

            <Fab
              className={classes.button}
              type="submit"
              color="primary"
              variant="extended"
            >
              <ImportExportIcon />
              Export Team
            </Fab>
          </div>
        </form>
        <Typography className={classes.card} variant="h6">
          Exported Teams
        </Typography>
        {teamExports
          ? teamExports.map(team => (
              <div className={classes.card} key={team.code}>
                <Typography inline>{team.code}</Typography>
                <div className={classes.buttons}>
                  <DeleteItem type="export" exportId={team.id} item />
                  <Button
                    className={classes.copyButton}
                    onClick={this.copyText.bind(this, team.code)}
                    color="secondary"
                    variant="outlined"
                    aria-label="Copy Code to Clipboard"
                    size="small"
                  >
                    <FileCopyIcon />
                    Copy Code
                  </Button>
                </div>
              </div>
            ))
          : ""}
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.successSnackbar}
          onClose={() => this.setState({ successSnackbar: false })}
          message={<span id="snackbar">Code Copied to Clipboard</span>}
        />
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.failureSnackbar}
          onClose={() => this.setState({ failureSnackbar: false })}
          message={<span id="snackbar">Unable to Copy Code to Clipboard</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  firebase: { auth, authError },
  firestore: { ordered }
}) => {
  const user = ordered && ordered.users ? ordered.users[0] : null;
  const teamExports =
    ordered && ordered.teamExports
      ? ordered.teamExports.filter(item => item.ownerId === user.id)
      : null;
  return {
    auth,
    authError,
    loaded: auth.isLoaded,
    unauthorized: auth.isEmpty,
    user,
    teamExports
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.auth.uid) return [];
    return [{ collection: "teamExports" }];
  })
)(withStyles(styles)(ExportTeam));
