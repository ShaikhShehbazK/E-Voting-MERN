import React, { createContext, useEffect, useReducer, useState } from "react";
// import Navbar from "./component/Navbar";
// import Home from "./component/Home";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navhome from "./NavHome/Navhome";
import Login from "./component/Login";

import { reducer, initialState } from "./reducer/useReducer";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Logout from "./component/Logout";
import axios from "axios";
import { AuthContext } from "./store/store";
import Footer from "./component/Footer";
import MainPage from "./component/MainPage";
import Profile from "./component/Profile";
import Candidate from "./component/Candidate";
import CandidateList from "./component/CandidateList";
import { use } from "react";
import VoteCount from "./component/VoteCount";
import UpdateCandidate from "./component/UpdateCandidate";
import Signup from "./component/Signup";
import FAQ from "./component/FAQ";
import HowItWorks from "./component/HowItWorks";
import Contact from "./component/Contact";
axios.defaults.withCredentials = true;

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/result" element={<VoteCount />} />
        <Route path="/candidate" element={<CandidateList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/updateCandidate"
          element={<UpdateCandidate mode="edit" />}
        />
        <Route
          path="/addCandidate"
          element={<UpdateCandidate mode="create" />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/howItWorks" element={<HowItWorks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Toaster />
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userRole, setUserRole] = useState();
  const [candidateId, setCandidateId] = useState();
  useEffect(() => {
    try {
      axios
        .get("https://e-voting-mern-1.onrender.com/user", {
          withCredentials: true, // ✅ Sends session cookies
        })
        .then((response) => {
          if (response.data.voter) {
            setUserRole(response.data.voter.role);
            console.log(response.data.voter);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error checking session:", error);
    }
  }, [isLoggedIn]);
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          userRole,
          candidateId,
          setCandidateId,
        }}
      >
        <Navbar />
        <Routing />
      </AuthContext.Provider>
    </>
  );
}

export default App;
