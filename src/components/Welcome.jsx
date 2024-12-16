import React from "react";
import { profilepic, username } from "../utils/getLocalStorage";

const Welcome = ({ setShowSidebar }) => {
  return (
    <>
      <div className="welcome-title">
        <h2>Welcome</h2>
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
        <p>{username}</p>
        <p style={{ color: "white" }}>To</p>
        <h1>snapTalk</h1>

        <button onClick={() => setShowSidebar(true)}>Start chatting</button>
      </div>
    </>
  );
};

export default Welcome;
