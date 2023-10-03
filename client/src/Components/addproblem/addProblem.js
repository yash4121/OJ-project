import React from "react";
import { useState, useNavigate } from "react";
import axios from "axios";
import "./AddProblem.css";
import { Navigate } from "react-router-dom";

const AddProblem = ({ isAuthor }) => {
  const [problemData, setProblemData] = useState({
    pname: "",
    statement: "",
    difficulty: "easy",
    tags: [],
    sampleInput: "",
    sampleOutput: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const history = useNavigate();

  const handleProblem = (e) => {
    const { id, value } = e.target;
    const newState = { ...problemData, [id]: value };
    setProblemData(newState);
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setProblemData((prevProblemData) => ({
      ...prevProblemData,
      tags: prevProblemData.tags.includes(selectedTag)
        ? prevProblemData.tags.filter((tag) => tag !== selectedTag)
        : [...prevProblemData.tags, selectedTag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userdatatoken");
      const verconfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("/problems", problemData, verconfig);

      setProblemData({
        pname: "",
        statement: "",
        difficulty: "easy",
        tags: [],
        sampleInput: "",
        sampleOutput: "",
      });

      setErrMessage("");

      history("/problems");
    } catch (error) {
      setErrMessage("Error occured while creating the new problem");
    }
  };
  return (
    <>
      {isAuthor ? (
        <>
          <div className="problem-container">
            <h2 className="text-2xl mt-4">New Problem:</h2>
            <form className="add-problem-form">
              <label className="text-2xl mt-4" htmlFor="pname">
                Problem Name:
              </label>
              <input
                className="border rounded-md w-full text-black"
                type="text"
                id="pname"
                value={problemData.pname}
                onChange={(e) => handleProblem(e)}
                required
              />
              <label className="text-2xl mt-4" htmlFor="statement">
                Problem Statement:{" "}
              </label>
              <textarea
                className="border w-full rounded-lg text-black"
                cols="15"
                rows="8"
                id="statement"
                value={problemData.statement}
                onChange={(e) => handleProblem(e)}
                required
              ></textarea>
              <div>
                <label className="text-2xl mt-4" htmlFor="difficulty">
                  Problem Difficulty:
                </label>
                <select
                  className="bg-white text-black rounded-lg m-2"
                  id="difficulty"
                  value={problemData.difficulty}
                  onChange={(e) => handleProblem(e)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <label className="text-2xl mt-4" htmlFor="sampleInput">
                Sample Input:{" "}
              </label>
              <textarea
                id="sampleInput"
                rows="5"
                value={problemData.sampleInput}
                onChange={(e) => handleProblem(e)}
                required
              />
              <label className="text-2xl mt-4" htmlFor="sampleOutput">
                Sample Output:{" "}
              </label>
              <textarea
                id="sampleOutput"
                rows="5"
                value={problemData.sampleOutput}
                onChange={(e) => handleProblem(e)}
                required
              />

              <label className="text-2xl mt-4">Tags: </label>
              <div className="tags">
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Greedy
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Constructive
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  DP
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Sliding Window
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Hash Table
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Heaps
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Graph
                </label>
                <label>
                  <input type="checkbox" id="greedy" value="greedy" />
                  Number theory
                </label>
              </div>
              <button className="submit-button" type="submit">
                Add Problem
              </button>
            </form>
            {errMessage !== "" ? <p>{errMessage}</p> : <></>}
          </div>
        </>
      ) : (
        <>
          <Navigate to={"/*"}></Navigate>
        </>
      )}
    </>
  );
};

export default AddProblem;
