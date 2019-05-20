import React from "react";
import Moment from "react-moment";

const GameDate = ({ date }) => {
  const calendarStrings = {
    lastDay: "[Yesterday at] h:mma",
    sameDay: "[Today at] h:mma",
    nextDay: "[Tomorrow at] h:mma",
    lastWeek: "[Last] dddd [at] h:mma",
    nextWeek: "dddd [at] h:mma",
    sameElse: "ddd MMM Do, YYYY [at] h:mma"
  };

  return <Moment calendar={calendarStrings}>{date}</Moment>;
};

export default GameDate;
