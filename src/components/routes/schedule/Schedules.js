import React, { useState } from "react";
import Schedule from "./Schedule";
import AddSchedule from "./AddSchedule";

import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },

  card: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.secondary[100]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.secondary[300]
    }
  },
  title: {
    backgroundColor: theme.palette.secondary[300]
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

const Schedules = ({ user, team, current, classes }) => {
  const [showSchedules, setshowSchedules] = useState(current);

  const schedules =
    team && user && user.schedules
      ? user.schedules.filter(schedule => schedule.teamId === team.id)
      : null;

  const mySchedules =
    team && schedules
      ? current
        ? schedules.filter(schedule => schedule.current)
        : schedules.filter(schedule => !schedule.current)
      : null;

  const myScheduleList =
    mySchedules && mySchedules.length > 0 ? (
      mySchedules.map(schedule => (
        <div
          key={schedule.id}
          className={current ? classes.title : classes.card}
        >
          <Schedule user={user} team={team} schedule={schedule} />
        </div>
      ))
    ) : current ? (
      <Typography className={classes.title} variant="h6">
        No Current Schedule
      </Typography>
    ) : (
      <Typography className={classes.title} variant="h6">
        No Other Schedules
      </Typography>
    );

  if (current) {
    return <div className={`Schedules ${classes.title}`}>{myScheduleList}</div>;
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
              Schedules
              <ExpandMoreIcon
                className={`${classes.expand} ${
                  showSchedules ? classes.expandOpen : null
                }`}
              />
            </Button>
          </CardActions>
        </CardContent>
        <Collapse in={showSchedules}>
          {myScheduleList}
          <AddSchedule
            classes={{ root: classes.card }}
            user={user}
            team={team}
          />
        </Collapse>
      </div>
    );
  }
};

export default withStyles(styles)(Schedules);
