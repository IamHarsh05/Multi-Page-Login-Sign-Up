import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProfileEdit = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    location: user && user.location ? user.location : "",
  });
  const [profileImage, setProfileImage] = useState(
    user.profileImage ? user.profileImage : "uploads/User-Profile-PNG.png"
  );

  const navigate = useNavigate();

  const { location } = formData;

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("profileImage", file);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/profile/image`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setProfileImage(response.data.path);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, profileImage: response.data.path })
      );
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile image");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, [e.target.name]: e.target.value })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/profile`,
        { location, profileImage },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.msg);
      const updatedUser = { ...user, location };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/user-type-selection");
    } catch (err) {
      const errorMessage = err.response?.data || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white-100 w-full min-h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          Welcome! Let's create your profile
        </h2>
        <p className="text-gray-700 mb-8">
          Let others get to know you better! You can do these later
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Add an avatar</h3>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 cursor-pointer"
              >
                <span className="text-sm">+</span>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
          </div>
          <p className="text-gray-500 text-center">
            Or choose one of our defaults
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Add your location</h3>
          <input
            id="location"
            type="text"
            name="location"
            value={location}
            onChange={onChange}
            required
            placeholder="Enter a location"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="w-full bg-pink-500 text-white m-2 py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProfileEdit;
