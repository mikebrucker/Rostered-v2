import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Collapse from "@material-ui/core/Collapse";
import { DateTimePicker } from "material-ui-pickers";

const styles = theme => ({
  textField: {
    margin: "0 auto",
    padding: theme.spacing.unit,
    maxWidth: 520
  },
  score: {
    display: "inline-block",
    maxWidth: theme.spacing.unit * 12
  },
  button: {
    margin: theme.spacing.unit
  },
  myTeam: {
    textAlign: "right",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  opponent: {
    textAlign: "left",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const GameForm = ({
  add,
  game,
  state,
  handleChange,
  handleSubmit,
  classes
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.textField}>
        <TextField
          fullWidth
          label="Opponent"
          placeholder="Opponent"
          type="text"
          name="opponent"
          variant="outlined"
          value={state.opponent}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <DateTimePicker
          fullWidth
          autoOk
          label="Date and Time"
          name="time"
          format="MM-DD-YYYY hh:mm A"
          variant="outlined"
          minutesStep={5}
          value={state.dateTime}
          onChange={handleChange}
        />
      </div>

      <div className={classes.textField}>
        <FormControlLabel
          label="Game Over"
          control={
            <Checkbox
              color="primary"
              type="checkbox"
              name="gameOver"
              checked={state.gameOver}
              onChange={handleChange}
            />
          }
        />
      </div>

      <Collapse in={add ? state.gameOver : true}>
        <div className={classes.textField}>
          <FormControlLabel
            label="Overtime"
            control={
              <Checkbox
                color="primary"
                type="checkbox"
                name="overTime"
                checked={state.overTime}
                onChange={handleChange}
              />
            }
          />
          <FormControlLabel
            label="Shootout"
            control={
              <Checkbox
                color="primary"
                type="checkbox"
                name="shootOut"
                checked={state.shootOut}
                onChange={handleChange}
              />
            }
          />
        </div>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid xs={5} item>
            <Typography
              className={classes.myTeam}
              variant="subtitle2"
              color="textSecondary"
            >
              {game && game.teamName ? game.teamName : "My Team"}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography variant="subtitle2" color="textSecondary">
              vs
            </Typography>
          </Grid>
          <Grid xs={5} item>
            <Typography
              className={classes.opponent}
              variant="subtitle2"
              color="textSecondary"
            >
              {game && game.opponent ? game.opponent : "Opponent"}
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.textField}>
          <div className={classes.score}>
            <TextField
              inputProps={{ style: { textAlign: "center" } }}
              variant="outlined"
              placeholder="Score"
              type="number"
              name="myScore"
              min="0"
              max="99"
              InputLabelProps={{ shrink: true }}
              value={state.myScore}
              onChange={handleChange}
            />
          </div>{" "}
          <div className={classes.score}>
            <TextField
              inputProps={{ style: { textAlign: "center" } }}
              variant="outlined"
              placeholder="Score"
              type="number"
              name="enemyScore"
              min="0"
              max="99"
              InputLabelProps={{ shrink: true }}
              value={state.enemyScore}
              onChange={handleChange}
            />
          </div>
        </div>
      </Collapse>

      <div>
        {add ? (
          <Fab
            className={classes.button}
            type="submit"
            color="primary"
            variant="extended"
          >
            <AddIcon />
            Add Game
          </Fab>
        ) : (
          <Fab
            className={classes.button}
            type="submit"
            color="primary"
            variant="extended"
          >
            <EditIcon /> Edit Game
          </Fab>
        )}
      </div>
    </form>
  );
};

export default withStyles(styles)(GameForm);
