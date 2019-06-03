import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import Schedules from "../schedule/Schedules";
import Players from "../player/Players";
import Loading from "../../utils/Loading";
import Settings from "../../utils/Settings";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 600,
    width: "100%"
  },
  card: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main
  },
  font: {
    fontWeight: "bold"
  },
  deleteItem: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  deleteItemAction: {
    paddingTop: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  }
});

const Team = ({ team, user, setTabValue, currentTabValue, classes }) => {
  if (team) {
    return (
      <div className={`Team ${classes.root}`}>
        <Card raised className={classes.card}>
          <CardHeader
            classes={{ root: classes.cardHeader, title: classes.font }}
            titleTypographyProps={{ variant: "h4" }}
            subheaderTypographyProps={{ variant: "h6" }}
            title={team.teamName}
            subheader={`Division ${team.division} at ${team.arena}`}
          />
          <Schedules user={user} team={team} current />
          <Players user={user} team={team} />
          <Schedules user={user} team={team} />
        </Card>
        <Card className={classes.deleteItem}>
          <CardContent className={classes.deleteItemAction}>
            <Settings
              user={user}
              item={team}
              setTabValue={setTabValue}
              currentTabValue={currentTabValue}
            />
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default firestoreConnect()(withStyles(styles)(Team));
