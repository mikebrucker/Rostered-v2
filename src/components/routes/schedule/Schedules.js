import React, { useState } from "react";
import Schedule from "./Schedule";
import AddSchedule from "./AddSchedule";

import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },

  card: {
    "&:nth-child(even)": {
      backgroundColor: theme.palette.background.schedule
    },
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.background.schedule2
    }
  },
  title: {
    backgroundColor: theme.palette.background.schedule2
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

const Schedules = ({ user, team, schedules, current, classes }) => {
  const [showSchedules, setshowSchedules] = useState(false);

  const mySchedules =
    schedules && schedules.length > 0
      ? schedules.map(schedule => (
          <div key={schedule.id} className={classes.card}>
            <Schedule user={user} team={team} schedule={schedule} />
          </div>
        ))
      : current
      ? "No Current Schedule"
      : "No Other Schedules";

  if (current) {
    return <div className="Schedules">{mySchedules}</div>;
  } else {
    return (
      <div className="Schedules">
        <CardContent className={classes.title}>
          <CardActions className={classes.actions}>
            <Button
              className={classes.button}
              onClick={() => setshowSchedules(!showSchedules)}
              color="secondary"
              variant="contained"
              aria-label="Show Schedules"
              size="small"
            >
              {`${team.teamName}${
                ["s", "S"].includes(team.teamName[team.teamName.length - 1])
                  ? "'"
                  : "'s"
              } Other Schedules`}
              <ExpandMoreIcon
                className={`${classes.expand} ${
                  showSchedules ? classes.expandOpen : null
                }`}
              />
            </Button>
          </CardActions>
        </CardContent>
        <Collapse in={showSchedules}>
          {mySchedules}
          <AddSchedule user={user} team={team} />
        </Collapse>
      </div>
    );
  }
};

export default withStyles(styles)(Schedules);
