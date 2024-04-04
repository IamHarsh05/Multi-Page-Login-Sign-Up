import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_UR}/api/auth/verify-email`,
        {
          email,
          otp,
        }
      );
      toast.success(res.data.msg);
      navigate("/");

      // Update userType in the user object in localStorage
      const updatedUser = { ...user, emailVerified: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err.response.data);
      toast.error("Failed to verify email. Please try again.");
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Send Verification Mail</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-bold mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>
          </form>
        </div>
      </main>
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

export default Verification;
