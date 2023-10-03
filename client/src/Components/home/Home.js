import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import HomeButton from "./HomeButton/HomeButton";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("userdatatoken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`/`, config);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <>
      <h1>Welcome back, {username}</h1>
      <div className="home-buttons">
        <HomeButton label={"PROBLEMS"} goTo={"problems"} />
        <HomeButton label={"LEADERBOARD"} goTo={"leaderboard"} />
        <HomeButton label={"PROFILE"} goTo={`users/${username}`} />
      </div>
    </>
  );
};

export default Home;
