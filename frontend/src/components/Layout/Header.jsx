import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("name") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setUsername(name || "");
    setRole(userRole || "");

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("name");
      const updatedRole = localStorage.getItem("role");

      setIsLoggedIn(!!token);
      setUsername(user || "");
      setRole(updatedRole || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");

    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    navigate("/");
  };

  // Determine dashboard route based on role
  const dashboardRoute =
    role === "admin" ? "/admin-dashboard" : "/user-dashboard";

  return (
    <nav className="navbar navbar-expand-lg px-3 py-4 border-bottom shadow-xl bg-gray-100">
      <div className="container-fluid">
        <TiShoppingCart className="font-semibold size-8 me-2" />
        <NavLink to="/" className="navbar-brand font-bold text-xl">
          Sasha Shop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username ? username.split(" ")[0] : "User"}
                </a>
                <ul className="dropdown-menu w-16">
                  <li>
                    <Link to={dashboardRoute} className="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart (0)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
