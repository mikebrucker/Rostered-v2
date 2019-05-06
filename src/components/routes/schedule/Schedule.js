import React from "react";
import Moment from "react-moment";
import AddGame from "../game/AddGame";
import Games from "../game/Games";

const Schedule = ({ user, team, schedule }) => {
  if (schedule) {
    return (
      <div className="Schedule">
        <h3>{schedule.season} Season</h3>
        <h6>{schedule.current ? "Current Season" : "Not Current Season"}</h6>
        <div>
          Season Starts{" "}
          <Moment format="MMM Do, YYYY">
            {schedule.startDate.seconds * 1000}
          </Moment>
        </div>
        <Games user={user} team={team} schedule={schedule} />
        <AddGame user={user} team={team} schedule={schedule} />
      </div>
    );
  } else {
    return <div className="Schedule">Loading...</div>;
  }
};

export default Schedule;
