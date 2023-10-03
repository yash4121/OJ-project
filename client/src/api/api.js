import axios from "axios";
const BASE_URL = "http://localhost:3000/";

export const getSubmissionsByID = async (pid) => {
  try {
    const token = localStorage.getItem("userdatatoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      BASE_URL + `/${pid}` + "/submissions",
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
