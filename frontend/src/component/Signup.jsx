import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const name = useRef();
  const email = useRef();
  const mobile = useRef();
  const adhaarCardNumber = useRef();
  const password = useRef();
  const address = useRef();
  const age = useRef();
  const role = useRef();

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const mobileValue = mobile.current.value;
    const adhaarCardNumberValue = adhaarCardNumber.current.value;
    const passwordValue = password.current.value;
    const addressValue = address.current.value;
    const ageValue = age.current.value;
    const roleValue = role.current.value;
    console.log(roleValue);

    try {
      const response = await axios.post("http://localhost:3002/signup", {
        name: nameValue,
        email: emailValue,
        mobile: mobileValue,
        adhaarCardNumber: adhaarCardNumberValue,
        password: passwordValue,
        address: addressValue,
        age: ageValue,
        role: roleValue,
      });
      toast.success("signup Successfully");
      console.log("Signup successful:", response.data);
      navigate("/"); // Redirect to home page
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "A user with this email already exists.",
        });
      }
      if (error.response.data.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        console.error("Signup error:", error);
        toast.error("Error: " + error.response.data.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="name"
            placeholder="Name"
            ref={name}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="number"
            placeholder="Age"
            ref={age}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="number"
            placeholder="Mobile Number"
            ref={mobile}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="text"
            placeholder="Address"
            ref={address}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="number"
            placeholder="AdhaarCardNumber"
            ref={adhaarCardNumber}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
          />
          <input
            type="text"
            placeholder="Email"
            ref={email}
            onFocus={(e) => {
              e.target.readOnly = false; // Remove readOnly when the user interacts
            }}
            className="w-full p-2 border rounded mb-2 mt-2"
            required
            readOnly
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
          Role:{" "}
          <select
            name="role"
            className=" p-2 border rounded mb-2 mt-2"
            ref={role}
          >
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <a href="/login" className="ml-2 text-blue-500 underline">
            login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
