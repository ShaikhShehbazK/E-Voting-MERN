import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/store";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateCandidate = ({ mode }) => {
  const { candidateId } = useContext(AuthContext);
  const navigate = useNavigate();
  const name = useRef();
  const age = useRef();
  const party = useRef();
  const [Image, setImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("❌ Only JPG, JPEG, PNG or WEBP files are allowed.");
        e.target.value = null; // reset input
        return;
      }

      setImage(file); // ✅ only if valid
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameVal = name.current.value;
    const ageVal = age.current.value;
    const partyVal = party.current.value;
    console.log(nameVal, ageVal, partyVal);

    if (mode === "create") {
      try {
        const data = new FormData();
        data.append("name", nameVal);
        data.append("age", ageVal);
        data.append("party", partyVal);
        data.append("image", Image); // ✅ actual file object

        const response = await axios.post(
          "http://localhost:3002/candidate",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        console.log(response.data);
        navigate("/candidate");
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Error: " + error.response.data.message);
      }
    } else {
      console.log("in else part");
      try {
        const data = new FormData();
        data.append("name", nameVal);
        data.append("age", ageVal);
        data.append("party", partyVal);
        if (Image) {
          data.append("image", Image);
        }
        const response = await axios.put(
          `http://localhost:3002/candidate/${candidateId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        navigate("/candidate");
      } catch (error) {
        console.log(error.response);
        toast.error("Error: " + error.response.data);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded-2xl border border-blue-200">
      {mode === "create" ? (
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Adding New Candidate
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Update Candidate Credentials
        </h1>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            ref={name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="age"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            ref={age}
            placeholder="Enter Age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="party"
          >
            Party Name
          </label>
          <input
            id="party"
            type="text"
            ref={party}
            placeholder="Party name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="image"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            // ref={image}
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <div className="pt-2">
          {mode === "edit" ? (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateCandidate;
