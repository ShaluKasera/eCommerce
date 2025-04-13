import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("phone", res.data.user.phone);
      localStorage.setItem("address", res.data.user.address);
      localStorage.setItem("role", res.data.user.role);

      window.dispatchEvent(new Event("storage"));

      toast.success("Successfully logged in!", { autoClose: 2000 });
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate(location.state || "/");
      }, 3000);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error("Error! Try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sasha-Login">
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 h-40 w-full">
        <form
          className="p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-4xl font-bold">Login</p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-b-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 mt-3 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-b-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-lg link transition-colors"
          >
            Login
          </button>
          <p className="text-end mt-2">
            <Link to="/forgot-password" className="no-underline">Forgot Password</Link>
          </p>

          <p className="text-center mt-2">
            Doesn't have account ?{" "}
            <Link to="/signup" className="ms-2 no-underline">
              Resgister Now
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
