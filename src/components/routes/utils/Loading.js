import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  fixed: {
    position: "fixed",
    height: "100vh",
    width: "100vw"
  },
  block: {
    margin: theme.spacing.unit
  }
});

const Loading = ({ classes, fixed }) => {
  // fixed attribute in component i.e. <Loading fixed />
  // makes loading circle appear in center of screen
  // otherwise it will be treated as display block
  return (
    <Grid
      className={fixed ? classes.fixed : classes.block}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default withStyles(styles)(Loading);
