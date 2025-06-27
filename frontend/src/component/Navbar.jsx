import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../store/store";
import svgTag from "../../public/svg-voter.png";
export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { userRole } = useContext(AuthContext);

  const RenderMenu = () => {
    if (isLoggedIn) {
      return (
        <>
          <a className="btn" href="/Logout">
            Logout
          </a>
        </>
      );
    } else {
      return (
        <>
          <a className="btn" href="/login">
            Login
          </a>
          <a className="btn" href="/signup">
            Signup
          </a>
        </>
      );
    }
  };

  const navRender = () => {
    if (userRole === "admin") {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          <li>
            <Link to="/candidate">List of Candidate</Link>
          </li>
          <li>
            <Link to="/result">Result</Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          <li>
            <Link to="/candidate">List of Candidate</Link>
          </li>
          <li>
            <Link to="/result">Result</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <div className="mx-auto">
        <div className="navbar bg-[#003366] shadow-sm ">
          {/* Mobile device */}
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
              >
                {navRender()}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl text-white">E-Voting</a>
          </div>

          {/* Deskpot */}
          <div className="navbar-center hidden lg:flex text-white">
            <ul className="menu menu-horizontal px-1">{navRender()}</ul>
          </div>
          <div className="navbar-end gap-2">
            <RenderMenu />
          </div>
        </div>
      </div>
    </>
  );
}

// export default Navbar;
