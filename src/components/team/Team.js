import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Team = ({ unauthorized }) => {
  if (unauthorized) return <Redirect to="/login" />;

  return (
    <div>
      <h1>TEAM</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  unauthorized: state.firebase.auth.isEmpty
});

export default connect(mapStateToProps)(Team);
