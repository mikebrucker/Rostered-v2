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
  const gamesToShow =
    user && user.games && recent
      ? user.games
          .filter(
            game =>
              Math.round(new Date().getTime() / 1000) > game.dateTime.seconds &&
              Math.round(new Date().getTime() / 1000) - 604800 <
                game.dateTime.seconds
          )
          .sort(
            (a, b) =>
              new Date(b.dateTime.seconds * 1000) -
              new Date(a.dateTime.seconds * 1000)
          )
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
      : user && user.games && !recent
      ? user.games
          .filter(
            game =>
              Math.round(new Date().getTime() / 1000) < game.dateTime.seconds &&
              Math.round(new Date().getTime() / 1000) + 604800 >
                game.dateTime.seconds
          )
          .sort(
            (a, b) =>
              new Date(a.dateTime.seconds * 1000) -
              new Date(b.dateTime.seconds * 1000)
          )
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
                gamesToShow && gamesToShow.length > 0 ? "" : "No "
              }Recent Games`
            : `${
                gamesToShow && gamesToShow.length > 0 ? "" : "No "
              }Upcoming Games`
        }
      />
      {gamesToShow}
    </Card>
  );
};

export default withStyles(styles)(UpcomingOrRecentGames);
