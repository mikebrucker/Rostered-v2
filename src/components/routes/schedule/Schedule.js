import React, { useState } from "react";
import Moment from "react-moment";
import Games from "../game/Games";
import Loading from "../../utils/Loading";
import Settings from "../../utils/Settings";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  },
  font: {
    fontWeight: "bold"
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

  const games =
    user && user.games
      ? user.games
          .filter(game => game.scheduleId === schedule.id)
          .sort(
            (a, b) =>
              new Date(a.dateTime.seconds * 1000) -
              new Date(b.dateTime.seconds * 1000)
          )
      : null;

  const wins =
    games && games.length > 0
      ? games.reduce((acc, cur) => {
          if (
            cur.gameOver &&
            (!cur.overTime || !cur.shootOut) &&
            parseInt(cur.myScore) > parseInt(cur.enemyScore)
          ) {
            acc++;
          }
          return acc;
        }, 0)
      : "";
  const winsOT =
    games && games.length > 0
      ? games.reduce((acc, cur) => {
          if (
            cur.gameOver &&
            (cur.overTime || cur.shootOut) &&
            parseInt(cur.myScore) > parseInt(cur.enemyScore)
          ) {
            acc++;
          }
          return acc;
        }, 0)
      : "";
  const losses =
    games && games.length > 0
      ? games.reduce((acc, cur) => {
          if (
            cur.gameOver &&
            (!cur.overTime || !cur.shootOut) &&
            parseInt(cur.myScore) < parseInt(cur.enemyScore)
          ) {
            acc++;
          }
          return acc;
        }, 0)
      : "";
  const lossesOT =
    games && games.length > 0
      ? games.reduce((acc, cur) => {
          if (
            cur.gameOver &&
            (cur.overTime || cur.shootOut) &&
            parseInt(cur.myScore) < parseInt(cur.enemyScore)
          ) {
            acc++;
          }
          return acc;
        }, 0)
      : "";
  const ties =
    games && games.length > 0
      ? games.reduce((acc, cur) => {
          if (cur.gameOver && cur.myScore === cur.enemyScore) {
            acc++;
          }
          return acc;
        }, 0)
      : "";

  const points =
    schedule && schedule.pointSystem
      ? schedule.pointSystem === "3210"
        ? `${wins * 3 + winsOT * 2 + lossesOT + ties} points`
        : `${wins * 2 + winsOT * 2 + lossesOT + ties} points`
      : "No Point System Added";

  const startDate =
    games && games.length > 0 ? (
      <div>
        <span>
          Starts{" "}
          <Moment format="MMM Do, YYYY">
            {games[0].dateTime.seconds * 1000}
          </Moment>
        </span>
        <div>
          Record {wins}-{losses}-{ties}
        </div>
        <div>{points}</div>
      </div>
    ) : (
      ""
    );

  const handleShowGames = () => {
    setShowGames(!showGames);
    showOrHideText === "Show"
      ? setShowOrHideText("Hide")
      : setShowOrHideText("Show");
  };

  if (schedule) {
    return (
      <CardContent className="Schedule">
        <CardHeader
          classes={{ title: classes.font }}
          title={
            schedule.current
              ? `Current Season - ${schedule.season}`
              : `${schedule.season} Season`
          }
          subheader={startDate}
        />
        <CardActions className={classes.actions}>
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
          <Card raised>
            <Games user={user} team={team} schedule={schedule} games={games} />
          </Card>
        </Collapse>

        <Settings user={user} item={schedule} scheduleGames={games} />
      </CardContent>
    );
  } else {
    return <Loading />;
  }
};

export default withStyles(styles)(Schedule);
