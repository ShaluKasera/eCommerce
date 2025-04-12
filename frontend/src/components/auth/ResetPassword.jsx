import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          email,
          answer,
          newPassword,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Password changed successfully");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("User not found! Please check your email and answer.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Error resetting password. Try again."
        );
      }
    }
  };

  return (
    <Layout title="Sasha - Reset Password">
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100">
        <form
          onSubmit={handleSubmit}
          className=" p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-bold">
            Reset Your Password
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your favourite sports"
            className="w-full px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-blue-600"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-blue-600"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="w-full mt-4 py-2 link transition">
            Reset Password
          </button>

          <p className="text-center mt-2 text-sm">
            Remember your password?{" "}
            <Link to="/login" className="font-bold ms-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
