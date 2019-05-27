import React from "react";
import Loading from "../../utils/Loading";
import EditProfile from "./EditProfile";

import { withStyles } from "@material-ui/core/styles";
import UpComingOrRecentGames from "./UpcomingOrRecentGames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ExportTeam from "./ExportTeam";

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
  }
});

const Profile = ({ user, classes }) => {
  const teams = user && user.teams && user.teams.length > 0 ? user.teams : [];

  const myTeams = teams
    ? teams.map((team, i, arr) => {
        return arr.length - 1 !== i ? (
          arr.length === 2 ? (
            <span key={team.id}>{team.teamName} </span>
          ) : (
            <span key={team.id}>{team.teamName}, </span>
          )
        ) : // last item
        arr.length === 1 ? (
          <span key={team.id}>{team.teamName}.</span>
        ) : (
          <span key={team.id}>and {team.teamName}.</span>
        );
      })
    : "";

  if (user) {
    return (
      <div className={`Profile ${classes.root}`}>
        <Card raised className={classes.card}>
          <CardHeader
            classes={{ root: classes.cardHeader, title: classes.font }}
            titleTypographyProps={{ variant: "h4" }}
            subheaderTypographyProps={{ variant: "h6" }}
            title={`${user.firstName} ${user.lastName}`}
            subheader={
              myTeams && myTeams.length > 0 ? (
                <span>Plays for {myTeams}</span>
              ) : (
                ""
              )
            }
          />
          <CardContent>
            <UpComingOrRecentGames user={user} />
          </CardContent>
          <CardContent>
            <UpComingOrRecentGames user={user} recent />
          </CardContent>
          <ExportTeam user={user} />
          <EditProfile user={user} />
        </Card>
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Profile);
