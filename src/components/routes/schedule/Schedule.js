import React, { useState } from "react";
import Moment from "react-moment";
import AddGame from "../game/AddGame";
import Games from "../game/Games";
import DeleteItem from "../delete/DeleteItem";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "linear-gradient(45deg, orange, green)"
  }
});

const Schedule = ({ user, team, schedule, classes }) => {
  const [showOrHideText, setShowOrHideText] = useState("Show");

  const showGames = () => {
    if (
      document.getElementById(`showGames-${schedule.id}`).style.display ===
      "none"
    ) {
      document.getElementById(`showGames-${schedule.id}`).style.display =
        "block";
      setShowOrHideText("Hide");
    } else {
      document.getElementById(`showGames-${schedule.id}`).style.display =
        "none";
      setShowOrHideText("Show");
    }
  };

  const showGamesIfCurrent = schedule && schedule.current ? "block" : "none";

  const showGamesButton =
    schedule && schedule.current ? null : (
      <Button
        className={classes.button}
        onClick={showGames}
        color="secondary"
        variant="outlined"
        aria-label="Show Games For this Schedule"
      >
        {showOrHideText} Games
      </Button>
    );

  if (schedule) {
    return (
      <div className="Schedule">
        <h3>
          {schedule.season} Season{schedule.current ? " - Current" : null}
          {showGamesButton}
        </h3>
        <div>
          Season Starts{" "}
          <Moment format="MMM Do, YYYY">
            {schedule.startDate.seconds * 1000}
          </Moment>
        </div>
        <div
          style={{ display: showGamesIfCurrent }}
          id={`showGames-${schedule.id}`}
        >
          <Games user={user} team={team} schedule={schedule} />
          <AddGame user={user} team={team} schedule={schedule} />
        </div>
        <DeleteItem user={user} item={schedule} />
      </div>
    );
  } else {
    return <div className="Schedule">Loading...</div>;
  }
};

export default withStyles(styles)(Schedule);
