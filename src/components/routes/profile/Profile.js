import React from "react";
import Loading from "../utils/Loading";
import EditProfile from "./EditProfile";

import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import UpcomingGames from "./UpcomingGames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 756,
    width: "100%"
  },
  card: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  }
});

const Profile = ({ user, classes }) => {
  const myTeams =
    user && user.teams
      ? user.teams.map((team, i, arr) => {
          return arr.length - 1 !== i ? (
            arr.length === 2 ? (
              <span key={team.id}>{team.teamName} </span>
            ) : (
              <span key={team.id}>{team.teamName}, </span>
            )
          ) : (
            // last item
            <span key={team.id}>and {team.teamName}.</span>
          );
        })
      : "";

  if (user) {
    return (
      <div className={`Profile ${classes.root}`}>
        <Card raised className={classes.card}>
          <CardHeader
            classes={{ title: classes.font }}
            titleTypographyProps={{ variant: "h4" }}
            subheaderTypographyProps={{ variant: "h6" }}
            title={`${user.firstName} ${user.lastName}`}
            subheader={<span>Plays for {myTeams}</span>}
          />
          <CardContent>
            <UpcomingGames user={user} />
          </CardContent>
          <EditProfile user={user} />
        </Card>
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Profile);
