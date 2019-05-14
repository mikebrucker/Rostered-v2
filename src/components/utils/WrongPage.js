import React from "react";
import { Redirect } from "react-router-dom";

function WrongPage() {
  return <Redirect to="/" />;
}

export default WrongPage;
