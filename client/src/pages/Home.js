import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Components/Context/context";

const Home = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const homeValid = async () => {
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
      console.log("user verify");
      setLoginData(data);
      history("/home");
    }
  };

  useEffect(() => {
    homeValid();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Home Coming soon</h2>
      {/* <p>User E-mail: {logindata ? logindata.validUserone.email : ""}</p> */}
    </div>
  );
};
export default Home;
