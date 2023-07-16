// import logo from './logo.svg';
import React from "react";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./Components/Head";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./pages/Home";
import Error from "./Components/Error";
import ProblemSet from "./pages/ProblemSet";
import Contest from "./pages/Contest";
import Rating from "./pages/Rating";
import Profile from "./pages/Dashboard";
function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/ProblemSet" element={<ProblemSet />} />
        <Route path="/Rating" element={<Rating />} />
        <Route path="/dash" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
