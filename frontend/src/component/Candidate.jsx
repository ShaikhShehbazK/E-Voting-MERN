import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateCandidate from "./UpdateCandidate";
import { AuthContext } from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";
import defaultImage from "/image2.webp";

const Candidate = ({
  candidatesName,
  party,
  userRole,
  candidate_Id,
  image,
}) => {
  const { setCandidateId, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleId = async (Id) => {
    console.log(Id);
    setCandidateId(Id);
    navigate("/updateCandidate");
  };

  const handleVoteButtonClick = async (voteId) => {
    if (!isLoggedIn) {
      toast("You must Login before Vote", {
        duration: 3000,
      });
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `https://e-voting-mern.onrender.com/candidate/vote/${voteId}`
        );
        console.log(response.data.message);
        toast.success(response.data.message);
        // ⏳ Reload after 1 seconds
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error.response.data);
        toast.error("Error: " + error.response.data);
      }
    }
  };

  const handleDelete = async (Id2) => {
    console.log(Id2);
    try {
      const response = await axios.delete(
        `https://e-voting-mern.onrender.com/candidate/${Id2}`
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      // ⏳ Reload after 1 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error);
    }
  };

  const handleControl = () => {
    if (userRole === "admin") {
      return (
        <>
          <Link to="/updateCandidate">
            <button
              className="badge badge-success bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
              onClick={() => handleId(candidate_Id)}
            >
              Edit
            </button>
          </Link>
          <button
            className="badge badge-success bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            onClick={() => handleDelete(candidate_Id)}
          >
            Delete
          </button>
        </>
      );
    } else {
      return (
        <button
          className="badge badge-success bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          onClick={() => handleVoteButtonClick(candidate_Id)}
        >
          Vote
        </button>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center my-6">
        <div className="w-full max-w-md">
          <ul className="bg-base-100 rounded-xl shadow-lg">
            <li className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0">
              {image ? (
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  src={`https://e-voting-mern.onrender.com/uploads/${image}`}
                  alt=""
                />
              ) : (
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  src={defaultImage}
                  alt=""
                />
              )}

              <div className="flex-1">
                <div className="text-lg font-semibold">{candidatesName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {party}
                </div>
              </div>
              {handleControl()}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Candidate;
