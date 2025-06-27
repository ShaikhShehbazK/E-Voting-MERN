import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/store";

function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.post("http://localhost:3002/logout", {
          withCredentials: true, // ✅ Sends session cookies
        });
        console.log(response.data);
        toast.success("logout Successfully");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to home page
      } catch (error) {
        console.error("Error:", error);
      }
    };
    checkLoginStatus();
  }, []);
  // return <div>Logout page</div>;
}

export default Logout;
