import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../userContext";
import axios from "axios";
import stubs from "../defaulMaterial";

const Compiler = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobid] = useState("");
  const { user, setUser } = useContext(UserContext);

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
  const toggleNavbar = () => {
    setIsOpen(!IsOpen);
  };
  function inputheader(text) {
    return <h2 className="text-2xl text-gray-800 text-bold mt-4">{text}</h2>;
  }
  function inputDesc(text) {
    return <p className="text-gray-500 text-sm md:text-base my-2">{text}</p>;
  }
  function preinput(header, description) {
    return (
      <>
        {inputheader(header)}
        {inputDesc(description)}
      </>
    );
  }
  return (
    <div className="px-1 mt-4 h-screen">
      <div className="pt-10 mx-2 md:mx-60 border shadow-lg shadow-gray-800 px-4 md:px-24 shadow-md min-h-full bg-zinc-50">
        <div className="relative">
          {preinput(
            "Code, Compile & Run",
            "Compile & run your code with online IDE"
          )}
          <div className="border mb-0">
            <button
              onClick={toggleNavbar}
              className="mr-20 text-lg px-2 pt-2 pb-1"
            >
              <div className="flex gap-2 items-center px-4 p1-2 bg-white shadow">
                <div className="text-base py-1 w-12 flex">
                  {language === "c" && <div>C</div>}
                  {language === "cpp" && <div>C++</div>}
                  {language === "py" && <div>Python</div>}
                </div>
                {!IsOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 hover:bg-gray-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
                {IsOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 hover:bg-gray-1003"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </div>
              {IsOpen && (
                <div className="flex flex-col justify-between absolute top-28 left-2 z-10 bg-white rounded-l drop-shadow-md shadow w-32 dark:bg-gray-700 dark:divide-gray-600">
                  <button
                    value="cpp"
                    onClick={(ev) => setLanguage(ev.target.value)}
                    className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm"
                  >
                    C++
                  </button>
                  <button
                    value="c"
                    onClick={(ev) => setLanguage(ev.target.value)}
                    className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    C
                  </button>
                  <button
                    value="py"
                    onClick={(ev) => setLanguage(ev.target.value)}
                    className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm"
                  >
                    Python
                  </button>
                </div>
              )}
            </button>
            <textarea
              className="h-96 rounded-md"
              value={code}
              onChange={(ev) => setCode(ev.target.value)}
            ></textarea>
          </div>
          <button
            className="w-20 py-2 mt-3 mb-5 text-white bg-zinc-800 rounded-sm"
            onClick={handleSubmit}
          >
            Run
          </button>
          <div>
            <span>Custom Input</span>
            <textarea
              className="h-36 rounded-md border"
              value={input}
              onChange={(ev) => setInput(ev.target.value)}
            ></textarea>
          </div>
          <div className="px-3 py-1 border">
            {{ status } && (
              <div className="flex gap-3 ">
                <div>
                  <span className="font-semibold text-gray-800">Status </span>{" "}
                  {status}
                </div>
                <div>{jobId && `JobId  ${jobId}`}</div>
              </div>
            )}
          </div>
          <div className="bg-white h-52 mb-24 border flex items-center justify-center">
            <div className="h-40 w-11/12 bg-yellow-100 opacity-70 p-2 overflow-y-scroll">
              <p className="text-black text-base">{output}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="App">
    //   {/* <h1>Online code compiler</h1> */}
    //   <div>
    //     <label>Language: </label>
    //     <select
    //       value={language}
    //       onChange={(e) => {
    //         let warning = window.confirm(
    //           "Switching the language, will erase your code. Do you wish to proceed ?"
    //         );
    //         if (warning) {
    //           setLanguage(e.target.value);
    //         }

    //         // console.log(e.target.value);
    //       }}
    //     >
    //       <option value="cpp">C++</option>
    //       <option value="java">Java</option>
    //       <option value="py">Python</option>
    //     </select>
    //   </div>
    //   <br />
    //   <textarea
    //     rows="20"
    //     cols={75}
    //     value={code}
    //     onChange={(e) => {
    //       setCode(e.target.value);
    //     }}
    //   ></textarea>
    //   <br />
    //   <input
    //     type="text"
    //     name="custom_input"
    //     id="custom_input"
    //     value={input}
    //     onChange={(e) => {
    //       setInput(e.target.value);
    //     }}
    //   />
    //   <button onClick={handleSubmit}>submit</button>
    //   <br />
    //   <button>Run</button>
    //   <p>{status}</p>
    //   <br />
    //   <p>{jobId && `jobId: ${jobId}`}</p>
    //   <br />
    //   <p>{output}</p>
    // </div>
  );
};

export default Compiler;
