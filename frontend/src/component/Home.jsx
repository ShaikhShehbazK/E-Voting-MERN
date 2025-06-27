import React, { useContext } from "react";
import { AuthContext } from "../store/store";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 text-center mb-4 drop-shadow-sm">
          Welcome to the <span className="text-blue-600">E-Voting Portal</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 text-center mb-6">
          Cast your vote securely from anywhere, anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
          {isLoggedIn ? (
            <a href="/candidate">
              <button className="w-full sm:w-auto bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
                Go to Vote
              </button>
            </a>
          ) : (
            <a href="/login">
              <button className="w-full sm:w-auto bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
                Login to Vote
              </button>
            </a>
          )}

          <a href="/signup">
            <button className="w-full sm:w-auto border border-blue-700 text-blue-700 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-50 transition">
              Register Now
            </button>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <span className="text-3xl mb-2">🔒</span>
            <span className="font-semibold text-blue-800 text-center">
              Secure Voting
            </span>
            <p className="text-gray-600 text-sm text-center mt-1">
              Your vote is encrypted and confidential.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <span className="text-3xl mb-2">📱</span>
            <span className="font-semibold text-blue-800 text-center">
              Easy to Use
            </span>
            <p className="text-gray-600 text-sm text-center mt-1">
              Simple and intuitive interface for everyone.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
            <span className="text-3xl mb-2">🕒</span>
            <span className="font-semibold text-blue-800 text-center">
              Vote Anytime
            </span>
            <p className="text-gray-600 text-sm text-center mt-1">
              Access the portal 24/7 from any device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
