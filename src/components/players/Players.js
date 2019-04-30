import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Players = ({ unauthorized }) => {
  if (unauthorized) return <Redirect to="/login" />;

  return (
    <div>
      <h1>PLAYERS</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  unauthorized: state.firebase.auth.isEmpty
});

export default connect(mapStateToProps)(Players);
