import React from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

const Welcome = ({ setShowSidebar }) => {
  const { token, profilepic, username,isLoading } = useSelector((state) => state?.user);

  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="welcome-title">
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto",
            }}
          >
            <img
              src={profilepic}
              alt="image"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <h2>Welcome</h2>

          <p>{username}</p>
          <p style={{ color: "white" }}>To</p>
          <h1>snapTalk</h1>

          <button onClick={() => setShowSidebar(true)}>Let’s Talk!</button>
        </div>
      </motion.div>
    </>
  );
};

export default Welcome;
