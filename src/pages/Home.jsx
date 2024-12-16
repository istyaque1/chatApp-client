import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import io from "socket.io-client";

const Home = ({ setRefresh }) => {
  const socket = io("https://chatapp-server-yfh2.onrender.com");

  const [showsidebar, setShowSidebar] = useState(false);

  return (
    <div className="chat">
      <div className={`${showsidebar ? "main-sidebar show" : "main-sidebar"}`}>
        <Sidebar
          socket={socket}
          setRefresh={setRefresh}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <div
        className="main-chat"
        style={{ display: showsidebar ? "none" : "block" }}
      >
        <MessageContainer socket={socket} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
