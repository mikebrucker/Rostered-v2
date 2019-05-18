import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  button: {
    margin: theme.spacing.unit
  }
});

const TeamForm = ({ add, state, handleChange, handleSubmit, classes }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Team Name"
          placeholder="Team Name"
          type="text"
          name="teamName"
          variant="outlined"
          value={state.teamName}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Division"
          placeholder="Division"
          type="text"
          name="division"
          variant="outlined"
          value={state.division}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Arena"
          placeholder="Arena"
          type="text"
          name="arena"
          variant="outlined"
          value={state.arena}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Sport"
          name="sport"
          variant="outlined"
          select
          SelectProps={{ native: true }}
          value={state.sport}
          onChange={handleChange}
        >
          <option defaultValue="Hockey">Hockey</option>
        </TextField>
      </div>

      <div>
        {add ? (
          <Fab
            className={classes.button}
            type="submit"
            color="primary"
            variant="extended"
          >
            <AddIcon />
            Add Team
          </Fab>
        ) : (
          <Fab
            className={classes.button}
            type="submit"
            color="primary"
            variant="extended"
          >
            <EditIcon />
            Edit Team
          </Fab>
        )}
      </div>
    </form>
  );
};

export default withStyles(styles)(TeamForm);
