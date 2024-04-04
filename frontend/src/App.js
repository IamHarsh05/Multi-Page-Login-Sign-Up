// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileEdit from "./components/ProfileEdit";
import UserTypeSelection from "./components/UserTypeSelection";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import VerificationEmail from "./components/VerificationEmail";
import Verification from "./components/Verify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/verification-mail-sent"
              element={
                <>
                  <VerificationEmail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/verify"
              element={
                <>
                  <Verification />
                </>
              }
            />
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/profile-edit" element={<ProfileEdit />} />
              <Route
                path="/user-type-selection"
                element={<UserTypeSelection />}
              />
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
