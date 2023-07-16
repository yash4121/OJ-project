import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Please Log In First</h2>
      <NavLink to="/">Back to home page</NavLink>
    </div>
  );
};

export default Error;
