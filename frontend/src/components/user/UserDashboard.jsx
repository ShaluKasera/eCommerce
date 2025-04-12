import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Spinner from "./Spinner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If no token or role is not 'user', stay loading (show spinner)
    if (!token || role !== "user") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || role !== "user") {
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
      <h2 className="text-center">Welcome to your Dashboard</h2>
    </Layout>
  );
};

export default Dashboard;
