import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Spinner from "../user/Spinner";
import { FaBars, FaListAlt, FaBoxOpen, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      setLoading(true);
      return;
    } else {
      setLoading(false);
    }

    const fetchAdminProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/admin-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
            withCredentials: true,
          }
        );

        console.log("Fetched data:", data);

        if (data?.admin) {
          setUser(data.admin);
          setLoading(false);
        } else {
          console.log("Admin data not found or token invalid");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.error(
          "Failed to fetch admin:",
          error?.response || error?.message || error
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    fetchAdminProfile();

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      setLoading(!(token && role === "admin"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  if (loading) return <Spinner />;

  return (
    <Layout title="Dashboard - Sasha Shop">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64 sm:w-48" : "w-12 sm:w-16"
          } bg-gray-400 text-black transition-all duration-300 h-[calc(100vh-4rem)] overflow-hidden`}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            {isSidebarOpen && <h2 className="text-xl font-bold">Admin</h2>}
            <button
              onClick={toggleSidebar}
              className="text-black text-xl ml-auto"
            >
              <FaBars />
            </button>
          </div>

          <div className="flex flex-col gap-2 p-2">
            <Link
              to="/admin-dashboard/create-category"
              className="flex items-center hover:bg-gray-300 text-black px-3 py-2 rounded no-underline"
            >
              <FaListAlt size={20} className="min-w-[20px]" />
              {isSidebarOpen && <span className="ml-3">Create Category</span>}
            </Link>
            <Link
              to="/admin-dashboard/create-products"
              className="flex items-center hover:bg-gray-300 text-black px-3 py-2 rounded no-underline"
            >
              <FaBoxOpen size={20} className="min-w-[20px]" />
              {isSidebarOpen && <span className="ml-3">Create Products</span>}
            </Link>
            <Link
              to="/admin-dashboard/users"
              className="flex items-center hover:bg-gray-300 text-black px-3 py-2 rounded no-underline"
            >
              <FaUsers size={20} className="min-w-[20px]" />
              {isSidebarOpen && <span className="ml-3">Users</span>}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="card w-80">
            <p>
              <strong>Name : </strong>
              {user?.name}
            </p>
            <p>
              <strong>Email : </strong>
              {user?.email}
            </p>
            <p>
              <strong>Phone : </strong>
              {user?.phone}
            </p>
            <p>
              <strong>Address : </strong>
              {user?.address}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
