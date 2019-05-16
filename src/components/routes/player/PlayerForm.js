import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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

const PlayerForm = ({
  add,
  state,
  handleChange,
  handleSubmit,
  importablePlayers,
  handleImportPlayerFromAnotherTeam,
  classes
}) => {
  const importPlayerFromAnotherTeam = add ? (
    <div className={classes.textField}>
      <TextField
        fullWidth
        label="Import Player"
        name="import"
        variant="outlined"
        helperText="Import Player From Another Team"
        select
        SelectProps={{ native: true }}
        defaultValue="default"
        onChange={handleImportPlayerFromAnotherTeam}
      >
        <option value="default">Import Other Player</option>
        {importablePlayers && importablePlayers.length > 0 ? (
          importablePlayers.map(player => (
            <option key={player.id} value={JSON.stringify(player)}>
              {player.firstName} {player.lastName}
            </option>
          ))
        ) : (
          <option value="none" disabled>
            No Other Players
          </option>
        )}
      </TextField>
    </div>
  ) : null;

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.textField}>
        <TextField
          // inputProps={{ ref: focusInput }}
          fullWidth
          label="First Name"
          variant="outlined"
          placeholder="First Name"
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          placeholder="Last Name"
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Number"
          variant="outlined"
          placeholder="Number"
          type="number"
          name="number"
          min="0"
          max="99"
          value={state.number}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>
          }}
        />
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Position"
          name="position"
          variant="outlined"
          helperText="Select Position"
          select
          SelectProps={{ native: true }}
          value={state.position}
          onChange={handleChange}
        >
          <option defaultValue="C">C</option>
          <option value="RW">RW</option>
          <option value="LW">LW</option>
          <option value="D">D</option>
          <option value="G">G</option>
        </TextField>
      </div>

      <div className={classes.textField}>
        <TextField
          fullWidth
          label={state.position === "G" ? "Catches" : "Shoots"}
          name="shoots"
          variant="outlined"
          helperText="Right-handed or Left-handed"
          select
          SelectProps={{ native: true }}
          value={state.shoots}
          onChange={handleChange}
        >
          <option defaultValue="Right">Right</option>
          <option value="Left">Left</option>
        </TextField>
      </div>

      <div>
        <Fab
          className={classes.button}
          type="submit"
          color="primary"
          variant="extended"
        >
          <AddIcon />
          Add New Player
        </Fab>
      </div>
      {importPlayerFromAnotherTeam}
    </form>
  );
};

export default withStyles(styles)(PlayerForm);
