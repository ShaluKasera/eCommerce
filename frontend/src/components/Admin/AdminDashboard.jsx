import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Spinner from "../user/Spinner";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || role !== "admin") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) return <Spinner />;

  return (
    <Layout title="Dashboard - Sasha Shop">
      <h2 className="text-center">Welcome to your admin Dashboard</h2>
    </Layout>
  );
};

export default AdminDashboard;

