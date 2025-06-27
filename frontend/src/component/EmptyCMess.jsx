import React, { useContext } from "react";
import { AuthContext } from "../store/store";
import { useNavigate } from "react-router-dom";

const EmptyCMess = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="text-center mt-16">
      <h2 className="text-xl text-gray-700">No Candidates Found</h2>
      {userRole === "admin" && (
        <button
          onClick={() => navigate("/addCandidate")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Candidate
        </button>
      )}
    </div>
  );
};

export default EmptyCMess;
