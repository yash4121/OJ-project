import "./App.css";
import Home from "./Components/home/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProblemList from "./Components/problemlist/ProblemList";
import LeaderBoard from "./Components/leaderboard/LeaderBoard";
import UserProfile from "./Components/userprofile/UserProfile";
import NotFound from "./Components/notfound/NotFound";
import Problem from "./Components/problem/Problem";
import SubmissionList from "./Components/submissionlist/SubmissionList";
import Submission from "./Components/submissions/Submission";
import LoginForm from "./Components/loginform/LoginForm";
import RegisterForm from "./Components/registerform/RegisterForm";
import Navbar from "./Components/navbar/Navbar";
import AddProblem from "./Components/addproblem/AddProblem";
import EditProblem from "./Components/editproblem/EditProblem";
import AddTestCase from "./Components/addtestcase/addTC";

// import { SERVER_BASE_URL } from "./config";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const ProtectedRoute = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(null);
    const location = useLocation();

    const validateToken = async () => {
      try {
        const token = localStorage.getItem("userdatatoken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`/validate`, config);
        return response.data;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    };

    useEffect(() => {
      const checkTokenValidity = async () => {
        const credentials = await validateToken();
        setIsTokenValid(credentials.valid);
        setisAuthenticated(credentials.valid);
        setAdmin(
          credentials.role && credentials.role === "admin" ? true : false
        );
      };

      checkTokenValidity();
    }, []);

    if (isTokenValid == null) {
      return null;
    }

    if (isTokenValid) {
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setisAuthenticated}
      />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path={"/logout"} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/problems">
          <Route
            index
            element={
              <ProtectedRoute>
                {" "}
                <ProblemList isAdmin={isAdmin} />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                {" "}
                <AddProblem isAdmin={isAdmin} />{" "}
              </ProtectedRoute>
            }
          />

          <Route path=":id">
            <Route
              index
              element={
                <ProtectedRoute>
                  {" "}
                  <Problem isAdmin={isAdmin} />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="addtc"
              element={
                <ProtectedRoute>
                  {" "}
                  <AddTestCase isAdmin={isAdmin} />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  {" "}
                  <EditProblem isAdmin={isAdmin} />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="submissions"
              element={
                <ProtectedRoute>
                  {" "}
                  <SubmissionList />{" "}
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="submissions">
            <Route
              index
              element={
                <ProtectedRoute>
                  {" "}
                  <SubmissionList />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Submission />{" "}
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Route>

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              {" "}
              <LeaderBoard />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/users">
          <Route
            path=":username"
            element={
              <ProtectedRoute>
                {" "}
                <UserProfile />{" "}
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
