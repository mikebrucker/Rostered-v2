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
