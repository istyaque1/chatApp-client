import React, { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/user/reset-password", {
      // .post("https://chatapp-server-yfh2.onrender.com/user/reset-password", {
        username: input,
      })
      .then((res) => {
        if (res?.data?.message === "user found") {
          navigate(`/reset`, { state: res?.data?.data }, { replace: true });
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div className="forget-password">
        <h1>Reset your password</h1>
        <form className="forget-form">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div className="forget-btn">
          <button onClick={handleSubmit}>Get reset link</button>
          <span style={{ color: "white" }}>or</span>
          <button onClick={() => navigate("/login")}>Back to login</button>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
