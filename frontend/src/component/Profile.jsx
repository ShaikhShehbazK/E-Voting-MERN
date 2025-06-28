import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/store";

const Profile = () => {
  const { userRole } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const currentPassword = useRef();
  const newPassword = useRef();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentPasswordValue = currentPassword.current.value;
    const newPasswordValue = newPassword.current.value;
    try {
      console.log(currentPasswordValue, newPasswordValue);
      const response = await axios.post(
        "https://e-voting-mern-1.onrender.com/profile/password",
        {
          currentPassword: currentPasswordValue,
          newPassword: newPasswordValue,
        }
      );
      console.log("Password updated successfully:", response.data);
      setShowForm(false); // Hide the form after successful submission
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password: " + error.response.data.message);
    }
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [adhaarCardNumber, setAdhaarCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    axios
      .get("https://e-voting-mern-1.onrender.com/profile", {
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data.userData;
        setName(userData.name);
        setAge(userData.age);
        setAdhaarCardNumber(userData.adhaarCardNumber);
        setEmail(userData.email);
        setIsVoted(userData.isVoted);
        setMobile(userData.mobile);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Main Profile Info */}
        <div className="flex-1 p-6 md:p-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">
            Your Profile
          </h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="font-medium text-lg">{name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Adhaar Card Number</p>
                <p className="font-medium text-lg">{adhaarCardNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium text-lg">{email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Age</p>
                <p className="font-medium text-lg">{age}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Mobile Number</p>
                <p className="font-medium text-lg">{mobile}</p>
              </div>
            </div>
          </div>
          {/* voting details */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-8">
              {/* <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Voting Status
              </h3> */}
              <div className="flex items-center gap-4">
                {/* <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    isVoted
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isVoted ? "Voted" : "Not Voted"}
                </span>
                {!isVoted && ( */}
                {userRole === "admin" ? (
                  <a href="/candidate">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow transition">
                      Configure Candidate
                    </button>
                  </a>
                ) : (
                  <a href="/candidate">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow transition">
                      Vote Now
                    </button>
                  </a>
                )}
              </div>
            </div>
            {showForm && (
              <div>
                <form action="POST" onSubmit={handleFormSubmit}>
                  <input
                    type="password"
                    placeholder="Enter CurrentPassword"
                    ref={currentPassword}
                    className="mb-2 w-full p-2 border rounded"
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Enter NewPassword"
                    ref={newPassword}
                    className="mb-2 w-full p-2 border rounded"
                  />
                  <input
                    type="submit"
                    value="Change your password"
                    className="bg-green-300 mb-2 w-full p-2 border rounded"
                  />
                </form>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
            <a
              href="/logout"
              className="flex-1 flex items-center justify-center bg-gray-200 hover:bg-red-400 text-gray-800 px-5 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </a>
            <button onClick={handleFormToggle}>
              <a className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-300">
                <svg
                  className="w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm6 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m12 0V9a6 6 0 10-12 0v4m12 0H6"
                  />
                </svg>
                Update Password
              </a>
            </button>
          </div>
        </div>
        {/* User Profile Card */}
        <div className="md:w-80 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-8 border-t md:border-t-0 md:border-l border-blue-100">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-blue-200 flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-blue-800 mb-1">
              {name || "User Name"}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              {email || "user@email.com"}
            </p>
            <div className="flex flex-col items-center mt-2">
              <span className="text-gray-500 text-xs">
                Adhaar: {adhaarCardNumber || "N/A"}
              </span>
              <span className="text-gray-500 text-xs">
                Mobile: {mobile || "N/A"}
              </span>
              <span className="text-gray-500 text-xs">Age: {age || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
