import React, { useContext, useEffect, useState } from "react";
import Candidate from "./Candidate";
import { AuthContext } from "../store/store";
import EmptyCMess from "./EmptyCMess";
import { useNavigate } from "react-router-dom";

const CandidateList = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [candidateList, setCandidatesList] = useState([]);

  useEffect(() => {
    const response = fetch("https://e-voting-mern-1.onrender.com/candidate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ this is the fetch equivalent of Axios' withCredentials
    })
      .then((res) => res.json())
      .then((data) => {
        setCandidatesList(data.response);
      })
      .catch((error) => {
        console.error("Error fetching candidate data:", error);
      });
  }, []);

  const handleAddButtonClick = () => {
    navigate("/addCandidate");
  };

  return (
    <>
      {candidateList.length === 0 ? (
        <EmptyCMess />
      ) : (
        <>
          {candidateList.map((candidate) => (
            <Candidate
              key={candidate._id}
              candidatesName={candidate.name}
              party={candidate.party}
              userRole={userRole}
              image={candidate.image}
              candidate_Id={candidate._id}
            />
          ))}
          {userRole === "admin" ? (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddButtonClick}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Candidate
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default CandidateList;
