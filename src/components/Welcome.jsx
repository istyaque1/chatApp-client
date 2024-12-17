import React from "react";
import { useSelector } from "react-redux";

const Welcome = ({ setShowSidebar }) => {
  const { token, profilepic, username } = useSelector((state) => state?.user);

  return (
    <>
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
    </>
  );
};

export default Welcome;
