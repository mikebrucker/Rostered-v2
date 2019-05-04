import React from "react";
import AddGame from "./games/AddGame";
import Moment from "react-moment";

const Schedule = ({ user, team, schedule }) => {
  if (schedule) {
    return (
      <div className="Schedule">
        <h3>{schedule.season} Season</h3>
        <h6>{schedule.current ? "Current Season" : "Not Current Season"}</h6>
        <div>
          Season Starts{" "}
          <Moment format="MMM Do, YYYY">{schedule.startDate}</Moment>
        </div>
        <AddGame user={user} team={team} schedule={schedule} />
      </div>
    );
  } else {
    return <div className="Schedule">Loading...</div>;
  }
};

export default Schedule;
