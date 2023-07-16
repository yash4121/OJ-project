import React, { useContext } from "react";
import { LoginContext } from "../Components/Context/context";

const Profile = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        User E-mail:{" "}
        {logindata.validUserone ? logindata.validUserone.email : ""}
      </h1>
      <h3>Problems Solved: </h3>
    </div>
  );
};

export default Profile;
