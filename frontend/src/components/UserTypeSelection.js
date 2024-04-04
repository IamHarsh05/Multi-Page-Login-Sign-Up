import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserTypeSelection = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedOption, setSelectedOption] = useState(
    user ? user.userType : null
  );
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Update userType in the user object
    const updatedUser = { ...user, userType: option };

    // Update user data in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
      // For simplicity, let's assume there's an API endpoint /api/user-type to handle user type selection
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/userType`,
        { userType: selectedOption },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (response) {
        toast.success(response.data.msg);
        if (!user.emailVerified) {
          navigate("/verification-mail-sent");
        } else {
          navigate("/");
        }
      }
      // Update userType in the user object in localStorage
      const updatedUser = { ...user, userType: selectedOption };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const options = [
    {
      id: 1,
      label: "I'm a designer looking to share my work",
      value: "designer",
      icon: (
        <img
          src="./SVGs/undraw_online_art_re_f1pk.svg"
          alt="svg"
          className="w-48 h-48"
        />
      ),
    },
    {
      id: 2,
      label: "I'm looking to hire a designer",
      value: "recruiter",
      icon: (
        <img
          src="./SVGs/undraw_people_re_8spw.svg"
          alt="svg"
          className="w-48 h-48"
        />
      ),
    },
    {
      id: 3,
      label: "I'm looking for design inspiration",
      value: "explorer",
      icon: (
        <img
          src="./SVGs/undraw_inspiration_re_ivlv.svg"
          alt="svg"
          className="w-48 h-48"
        />
      ),
    },
  ];

  return (
    <>
      <div className="bg-white px-4 py-10 md:p-28 rounded-lg w-screen h-full">
        <div className="flex items-center mb-6">
          <Link to={"/profile-edit"}>
            <span className="text-gray-500 mr-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </span>
          </Link>
          <h2 className="text-2xl font-bold">What brings you to Dribbble?</h2>
        </div>
        <p className="text-gray-700 mb-8">
          Select the options that best describe you. Don't worry, you can
          explore other options later.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg flex flex-col items-center cursor-pointer ${
                selectedOption === option.value
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => handleOptionChange(option.value)}
            >
              {option.icon}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full md:w-1/4 bg-pink-500 text-white py-2 rounded-md mt-8 hover:bg-pink-600 transition-colors duration-300"
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTypeSelection;
