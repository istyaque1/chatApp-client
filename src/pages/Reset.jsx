import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const state = useLocation().state;
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password not matched");
      return;
    }

    axios
      .post("https://chatapp-server-yfh2.onrender.com/user/reset", {
        password,
        confirmPassword,
        user: state,
      })
      .then((res) => {
        if (res?.data?.message === "password updated") {
          toast.success("Password updated");
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <div className="forget-password">
      <h1>Reset your password</h1>
      <form className="forget-form">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <form className="forget-form">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <div className="forget-btn">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Reset;
