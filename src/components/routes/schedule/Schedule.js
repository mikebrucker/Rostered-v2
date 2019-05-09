import React, { useState } from "react";
import Moment from "react-moment";
import AddGame from "../game/AddGame";
import Games from "../game/Games";
import DeleteItem from "../utils/DeleteItem";
import Loading from "../utils/Loading";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

const Schedule = ({ user, team, schedule, classes }) => {
  const [showOrHideText, setShowOrHideText] = useState("Show");
  const [showGames, setShowGames] = useState(schedule.current);

  const handleShowGames = () => {
    setShowGames(!showGames);
    showOrHideText === "Show"
      ? setShowOrHideText("Hide")
      : setShowOrHideText("Show");
  };

  if (schedule) {
    return (
      <CardContent className="Schedule">
        <Typography variant="h6">
          {schedule.current
            ? `Current Season - ${schedule.season}`
            : `${schedule.season} Season`}
        </Typography>
        <Typography variant="subtitle1">
          Starts{" "}
          <Moment format="MMM Do, YYYY">
            {schedule.startDate.seconds * 1000}
          </Moment>
        </Typography>
        <CardActions className={classes.actions}>
          <DeleteItem user={user} item={schedule} />
          <Button
            className={classes.button}
            onClick={handleShowGames}
            color="secondary"
            variant="contained"
            aria-label="Show Games For this Schedule"
            size="small"
          >
            Games
            <ExpandMoreIcon
              className={`${classes.expand} ${
                showGames ? classes.expandOpen : null
              }`}
            />
          </Button>
        </CardActions>
        <Collapse in={showGames}>
          <Games user={user} team={team} schedule={schedule} />
          <AddGame user={user} team={team} schedule={schedule} />
        </Collapse>
      </CardContent>
    );
  } else {
    return <Loading />;
  }
};

export default withStyles(styles)(Schedule);
