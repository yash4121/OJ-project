import React, { useState } from "react";
import "./mix.css";
// import { Input } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inputVal, setinputVal] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setValue = (e) => {
    const { name, value } = e.target;

    setinputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inputVal;
    if (email === "") {
      alert("Please enter Your E-mail address");
    } else if (!email.includes("@")) {
      alert("Please enter valid E-mail address");
    } else if (password === "") {
      alert("Please enter password");
    } else if (password.length < 6) {
      alert("Password length should be greater than 6");
    } else {
      // alert("User login successfully done");
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      // console.log(res);

      if (res.status === 201) {
        localStorage.setItem("userdatatoken", res.result.token);
        history("/home");
        setinputVal({
          ...inputVal,
          email: "",
          password: "",
        });
      } else {
        history("*");
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, We are glad you are back, please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputVal.email}
                onChange={setValue}
                id="email"
                placeholder="Enter your E-mail address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  value={inputVal.password}
                  onChange={setValue}
                  id="password"
                  placeholder="Enter your Password"
                />

                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={LoginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to={"/register"}>Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Login;
