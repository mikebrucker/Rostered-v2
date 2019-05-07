import React from "react";
import Moment from "react-moment";
import AddGame from "../game/AddGame";
import Games from "../game/Games";
import DeleteItem from "../delete/DeleteItem";

const Schedule = ({ user, team, schedule }) => {
  if (schedule) {
    return (
      <div className="Schedule">
        <h3>
          {schedule.season} Season{schedule.current ? " - Current" : null}
        </h3>
        <div>
          Season Starts{" "}
          <Moment format="MMM Do, YYYY">
            {schedule.startDate.seconds * 1000}
          </Moment>
        </div>
        <Games user={user} team={team} schedule={schedule} />
        <AddGame user={user} team={team} schedule={schedule} />
        <DeleteItem user={user} item={schedule} />
      </div>
    );
  } else {
    return <div className="Schedule">Loading...</div>;
  }
};

export default Schedule;
