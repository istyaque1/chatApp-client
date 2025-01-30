import React from "react";
import Svg from "../assets/bg.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
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
    </motion.div>
  );
};

export default HomePage;
