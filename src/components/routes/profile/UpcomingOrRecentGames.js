import React from "react";
import Game from "../game/Game";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

const styles = theme => ({
  font: {
    fontWeight: "bold"
  },
  card: {
    "&:nth-child(odd)": {
      backgroundColor: theme.palette.secondary[50]
    },
    "&:nth-child(even)": {
      backgroundColor: theme.palette.primary[100]
    }
  }
});

const UpcomingOrRecentGames = ({ user, recent, classes }) => {
  const recentGames =
    user && user.games
      ? user.games
          .filter(game => new Date() > new Date(game.dateTime.seconds * 1000))
          .sort(
            (a, b) =>
              new Date(b.dateTime.seconds * 1000) -
              new Date(a.dateTime.seconds * 1000)
          )
          .slice(0, 3)
          .map(game => {
            const team =
              user && user.teams
                ? user.teams.filter(team => team.id === game.teamId)[0]
                : null;
            return (
              <div className={classes.card} key={game.id}>
                <Game game={game} team={team} user={user} />
              </div>
            );
          })
      : null;

  const upcomingGames =
    user && user.games
      ? user.games
          .filter(game => new Date() < new Date(game.dateTime.seconds * 1000))
          .sort(
            (a, b) =>
              new Date(a.dateTime.seconds * 1000) -
              new Date(b.dateTime.seconds * 1000)
          )
          .slice(0, 5)
          .map(game => {
            const team =
              user && user.teams
                ? user.teams.filter(team => team.id === game.teamId)[0]
                : null;
            return (
              <div className={classes.card} key={game.id}>
                <Game game={game} team={team} user={user} />
              </div>
            );
          })
      : null;

  return (
    <Card raised className={`UpcomingGames`}>
      <CardHeader
        classes={{ root: classes.card, title: classes.font }}
        title={
          recent
            ? `${
                recentGames && recentGames.length > 0 ? "" : "No "
              }Recent Games`
            : `${
                upcomingGames && upcomingGames.length > 0 ? "" : "No "
              }Upcoming Games`
        }
      />
      {recent ? recentGames : upcomingGames}
    </Card>
  );
};

export default withStyles(styles)(UpcomingOrRecentGames);
