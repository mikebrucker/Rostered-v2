import React from "react";
import Moment from "react-moment";

const GameDate = ({ date }) => {
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[Last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "ddd MMM Do, YYYY [at] LT"
  };

  return <Moment calendar={calendarStrings}>{date}</Moment>;
};

export default GameDate;
