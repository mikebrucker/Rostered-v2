import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = ({ unauthorized, loaded }) => {
  if (loaded && unauthorized) return <Redirect to="/login" />;

  if (loaded && !unauthorized) {
    return (
      <div className="Dashboard">
        <h1>DASHBOARD</h1>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
        <p>d a s h b o a r d</p>
      </div>
    );
  } else {
    return <div className="Dashboard">Loading...</div>;
  }
};

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => ({
  auth,
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  user: ordered.users && ordered.users[0]
});

export default connect(mapStateToProps)(Dashboard);
