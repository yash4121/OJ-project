import axios from "axios";
import "./LeaderBoard.css";
import React, { useEffect, useState, useNavigate } from "react";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const [leaderboardInfo, setleaderboardInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        navigate("/*");
      }
    };
    getLeaderboard();
  }, []);
  return (
    <>
      <h1>Leaderboard</h1>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr className="leaderboard-tr">
                <th>Position</th>
                <th className="leaderboard-th">Username</th>
                <th className="leaderboard-th">Number of Solves</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardInfo.map((item, index) => (
                <tr key={index} className="leaderboard-tr">
                  <td>{index + 1}</td>
                  <td className="leaderboard-column1">
                    <Link
                      to={`/users/${item.username}`}
                      className="leaderboard-a"
                    >
                      {item.username}
                    </Link>
                  </td>
                  <td className="leaderboard-column2">{item.numberOfSolves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default LeaderBoard;
