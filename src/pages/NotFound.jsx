import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleNotFound = () => {
    return token ? navigate("/chat") : navigate("/login");
  };
  return (
    <div className="notfound">
      <h1 style={{ color: "white" }}>404</h1>
      <h1 style={{ color: "white" }}>Page not found</h1>
      <button onClick={handleNotFound} style={{ backgroundColor: "#eb3678" }}>
        Back to home
      </button>
    </div>
  );
};

export default NotFound;
