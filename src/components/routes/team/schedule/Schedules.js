import React from "react";
import Schedule from "./Schedule";

const Schedules = ({ user, team }) => {
  const schedules =
    team && team.schedules && team.schedules.length > 0
      ? team.schedules.map(schedule => (
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
      {schedules}
    </div>
  );
};

export default Schedules;
