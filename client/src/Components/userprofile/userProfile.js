import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProblemsSolvedTable from "./problemssolvedtable/ProblemsSolvedTable";
import SolveCounter from "./SolveCounter/SolveCounter";
import SubmissionCounter from "./submissioncounter/SubmissionCounter";

// import { SERVER_BASE_URL } from "../../config";
// import usePageTitle from "../../hooks/usePageTitle";

const UserProfile = () => {
  const { username } = useParams();

  // usePageTitle(`${username} - Coders Inc.`);

  const [userDetails, setuserDetails] = useState({
    username: "",
    numberOfSolves: "",
    numberOfSubmissions: "",
    problemsSolved: [],
  });

  const naviagate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`/users/${username}`, config);
        if (!response.data) {
          naviagate("/*");
        }
        setuserDetails(response.data);
      } catch (error) {
        naviagate("/*");
      }
    };

    fetchUserDetails();
  }, [username]);

  return (
    <>
      <h2 className="user-header">{userDetails.username}</h2>
      <div className="counter-container">
        <SubmissionCounter
          numberOfSubmissions={userDetails.numberOfSubmissions}
        />
        <SolveCounter numberOfSolves={userDetails.numberOfSolves} />
      </div>
      <br />
      <ProblemsSolvedTable problemsSolved={userDetails.problemsSolved} />
    </>
  );
};

export default UserProfile;
