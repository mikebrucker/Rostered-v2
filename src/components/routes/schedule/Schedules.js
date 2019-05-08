import React from "react";
import Schedule from "./Schedule";

const Schedules = ({ user, team, schedules, current }) => {
  const mySchedules =
    schedules && schedules.length > 0
      ? schedules.map(schedule => (
          <Schedule
            key={schedule.id}
            user={user}
            team={team}
            schedule={schedule}
          />
        ))
      : current
      ? "No Current Schedule"
      : "No Other Schedules";
  if (current) {
    return <div className="Schedules">{mySchedules}</div>;
  } else {
    return (
      <div className="Schedules">
        <h3>{team.teamName}'s Other Schedules</h3>
        {mySchedules}
      </div>
    );
  }
};

export default Schedules;
