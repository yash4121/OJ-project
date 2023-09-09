import React, { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, SetCPassShow] = useState(false);
  const [inputVal, setinputVal] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setValue = (e) => {
    const { name, value } = e.target;

    setinputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const addUser = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inputVal;
    if (fname === "") {
      alert("Please enter Your name");
    } else if (email === "") {
      alert("Please enter Your E-mail address");
    } else if (!email.includes("@")) {
      alert("Please enter valid E-mail address");
    } else if (password === "") {
      alert("Please enter password");
    } else if (password.length < 6) {
      alert("Password length should be greater than 6");
    } else if (cpassword === "") {
      alert("Please enter Confirm password");
    } else if (cpassword.length < 6) {
      alert("Confirm Password length should be greater than 6");
    } else if (password !== cpassword) {
      alert("password and confirm password doesn't match");
    } else {
      // console.log("User registration successfully done");
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      //console.log(res.status);
      if (res.status === 201) {
        alert("user registration done");
        setinputVal({
          ...inputVal,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>Hi, We are glad to welcome you, please sign up.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                onChange={setValue}
                name="fname"
                value={inputVal.fname}
                id="fname"
                placeholder="Enter your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setValue}
                name="email"
                value={inputVal.email}
                id="email"
                placeholder="Enter your E-mail address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setValue}
                  name="password"
                  value={inputVal.password}
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
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  onChange={setValue}
                  name="cpassword"
                  value={inputVal.cpassword}
                  id="cpassword"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => SetCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUser}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to={"/"}>Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
