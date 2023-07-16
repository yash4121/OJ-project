import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProblemSet() {
  const history = useNavigate();
  const problemsValid = async () => {
    let token = localStorage.getItem("userdatatoken");

    const res = await fetch("/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      history("*");
    } else {
      history("/ProblemSet");
    }
  };

  useEffect(() => {
    problemsValid();
  }, []);
  return <p>Problems coming soon</p>;
}
export default ProblemSet;
