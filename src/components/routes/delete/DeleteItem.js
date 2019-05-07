import React from "react";
import { firestoreConnect } from "react-redux-firebase";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: "linear-gradient(45deg, maroon, crimson)"
  }
});

const DeleteItem = props => {
  const { item, user, classes } = props;
  const type = item.id.split("-")[0];

  const showDeleteButton = () => {
    if (document.getElementById(`delete-${item.id}`).style.display === "none") {
      document.getElementById(`delete-${item.id}`).style.display =
        "inline-block";
    } else {
      document.getElementById(`delete-${item.id}`).style.display = "none";
    }
  };

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
        <Fab
          className={classes.button}
          onClick={showDeleteButton}
          color="primary"
          variant="extended"
          aria-label="Delete"
        >
          <DeleteIcon /> {type}
        </Fab>
        <div style={{ display: "none" }} id={`delete-${item.id}`}>
          <Fab
            className={classes.button}
            onClick={deleteItem}
            color="secondary"
            variant="extended"
            aria-label="Delete"
          >
            Delete this {type} Permanently?
          </Fab>
        </div>
      </div>
    );
  }
};

export default firestoreConnect()(withStyles(styles)(DeleteItem));
