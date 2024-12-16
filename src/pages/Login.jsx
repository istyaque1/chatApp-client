import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Svg from "../assets/bg.svg";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { username, password } = value;
    e.preventDefault();
    dispatch(loginUser({ username, password, navigate, toast }));
  };
  return (
    <div className="register">
      <div className="form">
        <h1 className="title">Login</h1>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="username"
              placeholder="Uassword"
              value={value?.username}
              onChange={handleChange}
              style={{ paddingLeft: "2rem", width: "100%" }}
            />
            <span
              style={{
                position: "absolute",
                left: "5px",
                top: "7px",
                color: "white",
              }}
            >
              <FaUserEdit />
            </span>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={value?.password}
              onChange={handleChange}
              style={{ paddingLeft: "2rem", width: "100%" }}
            />
            <span
              style={{
                position: "absolute",
                left: "5px",
                top: "7px",
                color: "white",
              }}
            >
              <RiLockPasswordFill />
            </span>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn">
          Login
        </button>
        <div
          className="login-footer"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0",
            justifyContent: "space-between",
            color: "#eb3678",
          }}
        >
          <p className="have-account">
            don't have an account ,
            <span onClick={() => navigate("/register")}>sign up</span>
          </p>
          <p style={{ cursor: "pointer" }} onClick={()=>navigate("/forget-password")}>Forget password</p>
        </div>
      </div>
      <div className="svg">
        <img src={Svg} alt="image" />
      </div>
    </div>
  );
};

export default Login;
