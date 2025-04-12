import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevVal) => {
        if (prevVal <= 1) {
          navigate("/login",
            {
              state:location.pathname
            }
          );
          clearInterval(interval);
          return 0;
        }
        return prevVal - 1;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [count,navigate,location]);

  return (
    <div className="d-flex justify-content-center flex-column align-items-center vh-100">
      <p>Redirecting to login in {count} second{count !== 1 ? "s" : ""}...</p>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
