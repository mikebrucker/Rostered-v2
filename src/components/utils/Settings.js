import React, { useState } from "react";
import DeleteItem from "./DeleteItem";

import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

import { IoMdSettings } from "react-icons/io";

const styles = theme => ({
  button: {
    marginLeft: "auto"
  },
  actions: {
    display: "flex"
  }
});

const Settings = ({ user, item, setTabValue, currentTabValue, classes }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="Settings">
      <CardActions className={classes.actions}>
        <IconButton
          className={classes.button}
          color="secondary"
          aria-label="Show Schedule Settings"
          onClick={() => setShowSettings(!showSettings)}
        >
          <IoMdSettings />
        </IconButton>
      </CardActions>
      <Collapse in={showSettings}>
        <CardActions className={classes.actions}>
          <DeleteItem
            user={user}
            item={item}
            setTabValue={setTabValue}
            currentTabValue={currentTabValue}
          />
        </CardActions>
      </Collapse>
    </div>
  );
};

export default withStyles(styles)(Settings);
