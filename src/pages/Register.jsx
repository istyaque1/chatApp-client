import React, { useState } from "react";
import axios from "axios";
import Svg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImCloudUpload } from "react-icons/im";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { createUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [value, setValue] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { fullname, username, password, confirmpassword } = value;
    e.preventDefault();

    if (file === "") {
      toast.error("Profile image is required");
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("photo", file);
    dispatch(createUser({ formData, navigate, toast }));
  };

  return (
    <div className="register">
      <div className="form">
        <h1 className="title">Create an account</h1>
        <div className="form-control">
          <label htmlFor="fullname">Fullname</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              value={value?.fullname}
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
              <BiSolidPencil />
            </span>
          </div>
        </div>
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
        <div className="form-control">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={value?.confirmpassword}
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

        <div style={{ padding: "20px", textAlign: "center" }}>
          <label
            htmlFor="fileInput"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            Upload Profile Image
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <br />
          <span style={{ fontSize: "14px", color: "#fff" }}>{file?.name}</span>
        </div>
        <div className="submit-btn" style={{ height: "37px" }}>
          <button onClick={handleSubmit} className="btn">
            Sign Up
            {isLoading && <span className="loaders"></span>}
          </button>
        </div>
        <p className="have-account">
          already have an account,
          <span onClick={() => navigate("/login")}>sign in</span>
        </p>
      </div>
      <div className="svg">
        <img src={Svg} alt="image" />
      </div>
    </div>
  );
};

export default Register;
