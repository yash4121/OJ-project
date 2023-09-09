import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllProblems = () => {
  const [probArr, setprobArr] = useState([]);
  const history = useNavigate();
  const filter = useSelector((state) => state.user);

  const ans = probArr.filter((prob) => {
    return prob.probName.toLowerCase().includes(filter.search.toLowerCase());
  });

  useEffect(() => {
    const getlist = async () => {
      //   const { list } = await GetProbList();
      //   console.log(list);
      //   setProbArr(list);
    };
    getlist();
  }, []);

  return (
    <div class="relative overflow-x-auto shadow-md">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">
              Problem Name
            </th>
            <th scope="col" class="px-6 py-3">
              Difficulty
            </th>
          </tr>
        </thead>
        <tbody>
          {ans.length > 0 &&
            ans.map((item) => (
              <tr
                onClick={() => history(`/singleProb/${item._id}`)}
                class="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.probName}
                </th>
                <td class="px-6 py-4"> {item.difficulty}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default AllProblems;
