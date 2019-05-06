import React from "react";
import Schedule from "./Schedule";

const Schedules = ({ user, team, schedules }) => {
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
      : "None Added Yet";

  return (
    <div className="Schedules">
      <h2>{team.teamName}'s schedules</h2>
      {mySchedules}
    </div>
  );
};

export default Schedules;
