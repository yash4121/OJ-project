import axios from "axios";
import "./Leaderboard.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [leaderboardInfo, setleaderboardInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const token = localStorage.getItem("userdatatoken");

        const res = await axios.get("/leaderboard", {
          headers: {
            // "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setleaderboardInfo(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error! not able to get leaderboard");
        setLoading(false);
      }
    };
  });
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardInfo.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/users/${item.username}`}>{item.username}</Link>
                </td>
                <td>{item.noOfSolves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
