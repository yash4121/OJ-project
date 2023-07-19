import React, { useEffect, useState } from "react";
import axios from "axios";
import stubs from "../defaulMaterial";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobid] = useState("");

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);
  const handleSubmit = async () => {
    const payLoad = {
      language,
      code,
      input,
    };
    try {
      setJobid("");
      setStatus("");
      setInput("");
      setOutput("");
      const { data } = await axios.post("http://localhost:8000/run", payLoad);
      console.log(data);

      setJobid(data.jobId);
      let intervalId;
      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:8000/status",
          { params: { id: data.jobId } }
        );
        const { success, job, error } = dataRes;
        // console.log(dataRes);

        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval(intervalId);
        } else {
          setStatus("Error: retry!");
          console.log(error);
          clearInterval(intervalId);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const msg = response.data.err.stderr;
        setOutput(msg);
      } else {
        setOutput("Error connecting to server");
      }
    }
  };
  return (
    <div className="App">
      <h1>Online code compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            let warning = window.confirm(
              "Switching the language, will erase your code. Do you wish to proceed ?"
            );
            if (warning) {
              setLanguage(e.target.value);
            }

            // console.log(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea
        rows="20"
        cols={75}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <input
        type="text"
        name="custom_input"
        id="custom_input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>submit</button>
      <br />
      <button>Run</button>
      <p>{status}</p>
      <br />
      <p>{jobId && `jobId: ${jobId}`}</p>
      <br />
      <p>{output}</p>
    </div>
  );
};

export default Compiler;
