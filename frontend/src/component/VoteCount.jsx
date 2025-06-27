import axios from "axios";
import React, { useEffect, useState } from "react";

const VoteCount = () => {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    axios
      .get("https://e-voting-mern.onrender.com/candidate/vote/count", {
        withCredentials: true, // ✅
      })
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vote count:", error);
      });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 sm:px-8 py-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded-2xl border border-blue-200 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Vote Count</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Party</th>
            <th className="px-4 py-2 border text-right">Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{candidate.name}</td>
              <td className="px-4 py-2 border">{candidate.party}</td>
              <td className="px-4 py-2 border text-right font-semibold">
                {candidate.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoteCount;
