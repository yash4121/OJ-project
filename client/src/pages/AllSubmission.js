import React, { useState } from "react";
function AllSubmission() {
  const [sub, setSub] = useState("");
  const [solArr, setSolArr] = useState([]);
  const handleSub = () => {};
  return (
    <div>
      <div>
        <button onClick={handleSub}>My SUbmission</button>
        <button
          onClick={() => {
            setSub(false);
          }}
        >
          All Submissions
        </button>
      </div>
      <div className="border border-blue-300 shadow rounded-md p-4">
        <table className="flex animate-pulse w-full justify-between">
          <thead>
            <tr>
              <th>User</th>
              <th>Problem</th>
              <th>Language</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {sub &&
              solArr.length > 0 &&
              solArr.map((item) => (
                <tr>
                  <th>{item.owner}</th>
                  <th>{item.problem}</th>
                  <th>{item.language}</th>
                  <th>{item.verdict}</th>
                </tr>
              ))}
            {/* {!sub &&
              solArr.length > 0 &&
              solArr
                .filter((it) => {
                  return it.owner === //uName;
                })
                .map((item) => (
                  <tr>
                    <th>{item.owner}</th>
                    <td>{item.problem}</td>
                    <td>{item.language}</td>
                    <td>{item.verdict}</td>
                  </tr>
                ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllSubmission;
