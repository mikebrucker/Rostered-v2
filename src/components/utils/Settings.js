import React, { useState } from "react";
import moment from "moment";
import DeleteItem from "./DeleteItem";
import EditPlayer from "../routes/player/EditPlayer";
import EditSchedule from "../routes/schedule/EditSchedule";
import EditTeam from "../routes/team/EditTeam";
import EditGame from "../routes/game/EditGame";
import AddScore from "../routes/game/AddScore";

import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { IoMdSettings } from "react-icons/io";

const styles = theme => ({
  settings: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  copyButton: {
    background: "linear-gradient(45deg, goldenrod, yellow)"
  },
  editButton: {
    marginLeft: "auto",
    background: "linear-gradient(45deg, green, lime)"
  },
  addScoreButton: {
    marginLeft: theme.spacing.unit / 2,
    background: "linear-gradient(45deg, cadetblue, aquamarine)"
  }
});

const Settings = ({
  user,
  scheduleGames,
  item,
  setTabValue,
  currentTabValue,
  classes
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failureSnackbar, setFailureSnackbar] = useState(false);

  const type = item.id.split("-")[0];

  const editForm =
    type === "player" ? (
      <EditPlayer user={user} player={item} showForm={showEditForm} />
    ) : type === "game" ? (
      <EditGame user={user} game={item} showForm={showEditForm} />
    ) : type === "schedule" ? (
      <EditSchedule user={user} schedule={item} showForm={showEditForm} />
    ) : type === "team" ? (
      <EditTeam user={user} team={item} showForm={showEditForm} />
    ) : null;

  const editGameScoreButton =
    type === "game" ? (
      <Button
        className={classes.addScoreButton}
        onClick={() => {
          setShowScoreForm(!showScoreForm);
          setShowEditForm(false);
        }}
        variant="outlined"
        color="secondary"
        size="small"
      >
        <AddIcon /> Score
      </Button>
    ) : null;

  const editGameScore =
    type === "game" ? (
      <AddScore user={user} game={item} showForm={showScoreForm} />
    ) : null;

  const copyText = itemsToCopy => {
    const itemsToCopyArray =
      itemsToCopy.length > 0 ? itemsToCopy : [itemsToCopy];
    const textToCopy = itemsToCopyArray
      ? itemsToCopyArray
          .map((game, i, arr) => {
            const result = game.gameOver
              ? `${
                  parseInt(game.myScore) === parseInt(game.enemyScore)
                    ? "Tie"
                    : parseInt(game.myScore) > parseInt(game.enemyScore)
                    ? "W"
                    : "L"
                } ${game.myScore} - ${game.enemyScore}\n`
              : "";
            return `${arr.length > 1 ? `Game ${i + 1}\n` : ""}${
              game.teamName
            } vs ${game.opponent}\n${result}${moment(
              new Date(game.dateTime.seconds * 1000)
            ).format("h:mma ddd MM-DD-YYYY")}${
              arr.length - 1 !== i ? "\n\n" : ""
            }`;
          })
          .join("")
      : "No Games";

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
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
      setSuccessSnackbar(true);
    } catch (err) {
      setFailureSnackbar(true);
    }

    document.body.removeChild(textArea);
  };

  const copyTextButton =
    type === "schedule" && scheduleGames && scheduleGames.length > 0 ? (
      <Button
        className={classes.copyButton}
        onClick={() => copyText(scheduleGames)}
        color="secondary"
        variant="outlined"
        aria-label="Copy Schedule to Clipboard"
        size="small"
      >
        <FileCopyIcon />
        Copy Schedule
      </Button>
    ) : type === "game" ? (
      <Button
        className={classes.copyButton}
        onClick={() => copyText(item)}
        color="secondary"
        variant="outlined"
        aria-label="Copy Schedule to Clipboard"
        size="small"
      >
        <FileCopyIcon />
        Copy
      </Button>
    ) : null;

  return (
    <div className="Settings">
      {editGameScore}
      {editForm}
      <CardActions className={classes.actions}>
        {editGameScoreButton}
        {copyTextButton}
        <IconButton
          className={classes.settings}
          color="secondary"
          aria-label="Show Schedule Settings"
          onClick={() => setShowSettings(!showSettings)}
        >
          <IoMdSettings />
        </IconButton>
      </CardActions>
      <Collapse in={showSettings}>
        <CardActions className={classes.actions}>
          <DeleteItem
            type={type}
            user={user}
            item={item}
            setTabValue={setTabValue}
            currentTabValue={currentTabValue}
          />
          <Button
            className={classes.editButton}
            onClick={() => {
              setShowEditForm(!showEditForm);
              setShowScoreForm(false);
            }}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <EditIcon /> {type}
          </Button>
        </CardActions>
      </Collapse>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={successSnackbar}
        onClose={() => setSuccessSnackbar(false)}
        message={
          <span id="snackbar">
            {type === "game" ? "Game" : "Schedule"} Copied to Clipboard
          </span>
        }
      />
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={failureSnackbar}
        onClose={() => setFailureSnackbar(false)}
        message={
          <span id="snackbar">
            Unable to Copy {type === "game" ? "Game" : "Schedule"} to Clipboard
          </span>
        }
      />
    </div>
  );
};

export default withStyles(styles)(Settings);
