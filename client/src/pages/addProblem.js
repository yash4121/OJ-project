import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProblem() {
  const [probName, setPName] = useState("");
  const [Statement, setStatement] = useState("");
  const [Constraints, setConstraints] = useState("");
  const [diff, setDiff] = useState("");
  const [fileName, setFName] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      probName,
      Statement,
      Constraints,
      diff,
    };
    if (probName && Statement && Constraints && fileName) {
      const { success, problem } = await axios.post("/addproblem", payLoad, {
        withCredentials: true,
      });
      if (success) {
        const payLoad = new FormData();
        payLoad.append("file", fileName);
        payLoad.append("name", fileName.name);
        payLoad.append("problem", problem._id);
        const res = await axios.post("/upload", payLoad, {
          withCredentials: true,
        });
        if (res.success) {
          history("/");
        }
      }
    }
  };
  return (
    <div>
      <form>
        <div>
          <h4 className="text-2xl mt-4">Add Problem Name: </h4>
          <input
            className="border rounded-md w-full text-black"
            type="text"
            name="probName"
            id="probName"
            value={probName}
            onChange={(e) => {
              setPName(e.target.value);
            }}
            placeholder="short name"
          />
          <h4 className="text-2xl mt-4">Add Problem Statement: </h4>
          <textarea
            className="border w-full rounded-lg text-black"
            name="Statement"
            id="Statement"
            rows="8"
            cols={10}
            value={Statement}
            onChange={(e) => {
              setStatement(e.target.value);
            }}
            placeholder="Explain problem."
          />
          <h4 className="text-2xl mt-4">Add Problem Constraints: </h4>
          <textarea
            className="border w-full rounded-lg text-black"
            name="Constraints"
            id="Constraints"
            rows="5"
            value={Constraints}
            onChange={(e) => {
              setConstraints(e.target.value);
            }}
            placeholder="Problem constraints"
          />
          <div>
            <label>Dificulty: </label>
            <select
              className="bg-white text-black rounded-lg m-2"
              name="diff"
              id="diff"
              value={diff}
              onChange={(e) => {
                setDiff(e.target.value);
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex justify-between">
            <input
              className="rounded-lg m-1"
              type="file"
              onChange={(e) => setFName(e.target.files[0])}
            />
            <button
              className="border-2 rounded-lg mr-1 mb-2 p-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProblem;
