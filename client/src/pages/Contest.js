import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contest = () => {
  const history = useNavigate();
  const contestValid = async () => {
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
      history("/Contest");
    }
  };

  useEffect(() => {
    contestValid();
  }, []);
  return <p>Contest coming soon</p>;
};
export default Contest;
