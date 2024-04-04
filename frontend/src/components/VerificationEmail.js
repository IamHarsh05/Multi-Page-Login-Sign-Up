import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const VerificationEmail = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const sendVerificationEmail = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/sendVerificationEmail`,
        {
          email: user.email,
          verificationToken: user.verificationToken,
        }
      );
      toast.success(`Verification email sent successfully`);
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold mb-4">Please verify your email...</h1>
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>
        <p className="text-gray-700 mb-4">
          Please verify your email address. We've sent a confirmation email to:
        </p>
        <p className="text-gray-800 font-bold mb-6">{user.email}</p>
        <p className="text-gray-700 mb-4">
          Click the confirmation link in that email to begin using Dribbble.
        </p>
        <p className="text-gray-700 mb-6">
          Didn't receive the email? Check your Spam folder, it may have been
          caught by a filter. If you still don't see it, you can{" "}
          <button
            onClick={sendVerificationEmail}
            className="text-pink-500 hover:text-pink-600"
          >
            resend the confirmation email
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default VerificationEmail;
