import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = ({ unauthorized }) => {
  if (unauthorized) return <Redirect to="/login" />;

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
      <p>d a s h b o a r d</p>
      <p>d a s h b o a r d</p>
      <p>d a s h b o a r d</p>
      <p>d a s h b o a r d</p>
      <p>d a s h b o a r d</p>
      <p>d a s h b o a r d</p>
    </div>
  );
};

const mapStateToProps = state => ({
  unauthorized: state.firebase.auth.isEmpty
});

export default connect(mapStateToProps)(Dashboard);
