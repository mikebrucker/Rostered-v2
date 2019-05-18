import React, { useState } from "react";
import DeleteItem from "./DeleteItem";
import EditPlayer from "../routes/player/EditPlayer";
import EditGame from "../routes/game/EditGame";
import EditSchedule from "../routes/schedule/EditSchedule";
import EditTeam from "../routes/team/EditTeam";
import AddResult from "../routes/game/AddResult";

import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { IoMdSettings } from "react-icons/io";

const styles = theme => ({
  settings: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  editButton: {
    marginLeft: "auto",
    background: "linear-gradient(45deg, green, lime)"
  },
  addResultButton: {
    marginLeft: theme.spacing.unit / 2,
    background: "linear-gradient(45deg, blue, cyan)"
  }
});

const Settings = ({ user, item, setTabValue, currentTabValue, classes }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);

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

  const editGameResultsButton =
    type === "game" ? (
      <Button
        className={classes.addResultButton}
        onClick={() => {
          setShowResultForm(!showResultForm);
          setShowEditForm(false);
        }}
        variant="outlined"
        color="secondary"
        size="small"
      >
        <AddIcon /> Result
      </Button>
    ) : null;

  const editGameResults =
    type === "game" ? (
      <AddResult user={user} game={item} showForm={showResultForm} />
    ) : null;

  return (
    <div className="Settings">
      {editGameResults}
      {editForm}
      <CardActions className={classes.actions}>
        {editGameResultsButton}
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
              setShowResultForm(false);
            }}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <EditIcon /> {type}
          </Button>
        </CardActions>
      </Collapse>
    </div>
  );
};

export default withStyles(styles)(Settings);
