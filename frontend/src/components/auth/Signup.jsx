import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          email,
          password,
          name,
          phone,
          address,
          role,
          answer,
        }
      );

      console.log("Signup success:", res.data);

      // Clear form
      setName("");
      setAddress("");
      setEmail("");
      setPassword("");
      setRole("user");
      setPhone("");
      setAnswer("");
      toast.success("Successfully Register!", { autoClose: 2000 });
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error("Error! Try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sasha-Register">
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 w-full">
        <form
          className="p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-4xl font-bold">Signup</p>

          <input
            type="text"
            placeholder="Enter your Name"
            className="w-full mt-2 px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full mt-2 px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 mt-3 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input
            type="text"
            placeholder="Enter Phone number"
            className="w-full px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Address"
            className="w-full mt-2 px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="What is your favourite sports ? "
            className="w-full mt-2 px-4 py-2 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <select
            className="px-4 py-2 mt-2 border-b-2 border-gray-800 w-full focus:outline-none focus:border-gray-800"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">Customer</option>
          </select>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-lg link transition-colors"
          >
            Register
          </button>
          <p className="text-center mt-2">
            Already register ?{" "}
            <Link to="/login" className="ms-2 no-underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
