import React from "react";
import Svg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="left">
        <h1>welcome to SnapTalk</h1>
        <div className="btns">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign up</button>
        </div>
      </div>
      <div className="svg">
        <img src={Svg} alt="image" />
      </div>
    </div>
  );
};

export default HomePage;
