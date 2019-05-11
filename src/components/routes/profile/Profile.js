import React from "react";
import { Redirect } from "react-router-dom";
import Loading from "../utils/Loading";
import EditProfile from "./EditProfile";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";

const styles = theme => ({});

const Profile = ({ user, unauthorized, loaded }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  if (user) {
    return (
      <div className="Profile">
        <Typography variant="h1">
          {user.firstName} {user.lastName}
        </Typography>
        <EditProfile user={user} />
      </div>
    );
  } else {
    return <Loading fixed />;
  }
};

export default withStyles(styles)(Profile);
