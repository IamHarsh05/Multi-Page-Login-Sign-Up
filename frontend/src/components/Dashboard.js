import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/details`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          setUser(res.data);
          if (res.data.emailVerified !== true)
            navigate(`/verification-mail-sent`);
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
        console.error("Failed to fetch user details:", err);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user"); // Clear user data on logout
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col">
      <main className="flex-grow container mx-auto py-8">
        <div className="bg-white rounded-lg mx-1 p-8 md:w-1/2 md:mx-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {user ? (
            <div className="flex flex-col md:flex-row">
              <div className="p-4">
                <img
                  src={user.profileImage ? `${user.profileImage}` : ""}
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              </div>
              <div className="p-8">
                <p>Welcome back, {user.username}!</p>
                <p>Email: {user.email}</p>
                <p>Location: {user.location}</p>
              </div>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
          <button
            onClick={handleLogout}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
          <Link to={"/profile-edit"}>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold mx-4 py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">
              Edit
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
