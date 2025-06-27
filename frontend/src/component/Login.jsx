import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../store/store";
import loginImage from "../../public/voting-image1.jpg";
import loginImage2 from "../../public/image2.webp";

export default function Login() {
  const adhaarCardNumber = useRef();
  const password = useRef();

  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const adhaarCardNumberValue = adhaarCardNumber.current.value;
    const passwordValue = password.current.value;
    try {
      const response = await axios.post(
        "https://e-voting-mern-1.onrender.com/login",
        {
          adhaarCardNumber: adhaarCardNumberValue,
          password: passwordValue,
        }
      );
      toast.success("login Successfully");
      setIsLoggedIn(true);
      console.log("login successful:", response.data);
      navigate("/"); // Redirect to home page
      window.location.reload();
    } catch (error) {
      console.error("login error:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center lg:justify-between justify-center bg-pink-700">
      <div className="bg-white shadow-lg rounded-lg pt-5 pb-5 pr-15 pl-15 w-full max-w-sm mx-5 ">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <div className="w-40 mx-auto">
          <img src={loginImage2} alt="" />
        </div>
        <form onSubmit={handleSignup}>
          <input
            type="number"
            placeholder="AdhaarCardNumber"
            ref={adhaarCardNumber}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
            onFocus={(e) => {
              e.target.readOnly = false; // Remove readOnly when the user interacts
            }}
            readOnly
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-2 mt-4"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?
          <a href="/signup" className="ml-2 text-blue-500 underline">
            Signup
          </a>
        </p>
      </div>
      <div className="w-3/4 hidden lg:block ml-20 justify-end">
        <img
          className="w-5xl overflow-hidden object-fit rounded-4xl"
          src={loginImage}
          alt=""
        />
      </div>
    </div>
  );
}
