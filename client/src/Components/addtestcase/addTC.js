import React from "react";
import { useState, useNavigate, useParams, Navigate } from "react";
import axios from "axios";
import "./addTC.css";

const AddTestCase = ({ isAuthor }) => {
  const [testInput, handleTestInput] = useState("");
  const [testOutput, handleTestOutput] = useState("");

  const [errMessage, setErrMessage] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userdatatoken");
      const verconfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        testCaseInput: testInput,
        testCaseOutput: testOutput,
        problemID: id,
      };
      await axios.post(`/problems/${id}/addtc`, data, verconfig);
      handleTestInput("");
      handleTestOutput("");
      setErrMessage("");
      history(`/problems/${id}`);
    } catch (error) {
      setErrMessage("Error while adding test case");
    }
  };
  return (
    <>
      {isAuthor ? (
        <>
          <div className="problem-container">
            <h2 className="text-2xl mt-4">New Test case</h2>
            <form className="add-problem-form" onSubmit={handleSubmit}>
              <label className="text-2xl mt-4" htmlFor="tcInput">
                Test Case Input:{" "}
              </label>
              <textarea
                className="border rounded-md w-full text-black"
                id="tcInput"
                value={testInput}
                onChange={(e) => handleTestInput(e.target.value)}
                required
              ></textarea>
              <label className="text-2xl mt-4" htmlFor="tcOutput">
                Test Case Output:{" "}
              </label>
              <textarea
                className="border rounded-md w-full text-black"
                id="tcOutput"
                value={testOutput}
                onChange={(e) => handleTestOutput(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="submit-button">
                {" "}
                Add Test Case
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

export default AddTestCase;
