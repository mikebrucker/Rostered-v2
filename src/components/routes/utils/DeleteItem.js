import React, { useState } from "react";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  button: {
    background: "linear-gradient(45deg, maroon, crimson)"
  },
  deleteButton: {
    margin: theme.spacing.unit,
    background: "linear-gradient(45deg, maroon, crimson)"
  },
  paper: {
    position: "absolute",
    minWidth: 260,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    outline: "none",
    border: `${theme.spacing.unit}px solid maroon`,
    borderRadius: theme.spacing.unit * 2
  }
});

const getModalStyle = () => ({
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
});

const DeleteItem = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const { item, user, setValue, currentValue, classes } = props;
  const type = item.id.split("-")[0];

  const deleteItem = () => {
    const userId = user ? user.id : null;
    const typeArray = `${type}s`;

    // if type is team remove all schedules games and players with teamId
    // if type is schedule remove all games with scheduleId
    const removeAssociatedData = associatedDataArray => {
      associatedDataArray.forEach(associatedData => {
        if (user[associatedData]) {
          user[associatedData]
            .filter(thisData => thisData.teamId === item.id)
            .forEach(thisData => {
              props.firestore
                .collection("users")
                .doc(userId)
                .update({
                  [associatedData]: props.firestore.FieldValue.arrayRemove(
                    thisData
                  )
                });
            });
        }
      });
    };

    if (type === "schedule" && userId) {
      removeAssociatedData(["games"]);
    } else if (type === "team" && userId) {
      if (setValue && currentValue) setValue(currentValue - 1);
      removeAssociatedData(["players", "schedules", "games"]);
    }

    if (userId) {
      props.firestore
        .collection("users")
        .doc(userId)
        .update({
          [typeArray]: props.firestore.FieldValue.arrayRemove(item)
        });
    }
  };

  if (item) {
    return (
      <div className="DeleteItem">
        <Button
          className={classes.button}
          onClick={() => setModalOpen(true)}
          color="secondary"
          variant="outlined"
          aria-label="Delete"
          size="small"
        >
          <DeleteIcon /> {type}
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography gutterBottom variant="h6">
              Are You Sure You Want To Permanently Delete This{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}?
            </Typography>
            <Fab
              className={classes.deleteButton}
              onClick={deleteItem}
              color="secondary"
              variant="extended"
              aria-label="Delete"
              size="medium"
            >
              <DeleteIcon /> Delete {type}
            </Fab>
          </div>
        </Modal>
      </div>
    );
  }
};

export default firestoreConnect()(withStyles(styles)(DeleteItem));
