import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  button: {
    margin: theme.spacing.unit
  }
});

const ScheduleForm = ({ state, handleChange, handleSubmit, classes }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Season Name"
          placeholder="Season Name"
          type="text"
          name="season"
          variant="outlined"
          value={state.season}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <FormControlLabel
          label="Current Season"
          control={
            <Checkbox
              color="primary"
              type="checkbox"
              name="current"
              checked={state.current}
              onChange={handleChange}
            />
          }
        />
      </div>

      <div>
        <Fab
          className={classes.button}
          type="submit"
          color="primary"
          variant="extended"
        >
          <AddIcon />
          Add Schedule
        </Fab>
      </div>
    </form>
  );
};

export default withStyles(styles)(ScheduleForm);
