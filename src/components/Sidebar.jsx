import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { RiLogoutBoxFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { getAllUsers } from "../features/getUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  messages,
  currentSelectedUser,
  emptyChat,
} from "../features/messageSlice";
import { logoutUser } from "../features/userSlice";

const Sidebar = ({ socket, setRefresh, setShowSidebar }) => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.getUsers);
  const { selectUser } = useSelector((state) => state.messages);
  const { token, profilepic, username } = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  const handleSelect = (user) => {
    dispatch(messages({ token, id: user?._id }));

    dispatch(currentSelectedUser(user));
    setShowSidebar(false);
  };

  useEffect(() => {
    // setChats([]);
    dispatch(emptyChat());
  }, [selectUser?._id]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleLogoutToggle = () => {
    return setLogoutToggle((prev) => !prev);
  };

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(Object.keys(users));
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket]);

  return (
    <>
      <div className="sidebar">
        <div className="side-header">
          <div
            className="info"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={profilepic} alt="" />
              <p>{username}</p>
            </div>
            <div onClick={handleLogoutToggle}>
              <span>
                <CiMenuKebab />
              </span>
            </div>
          </div>
          <input type="text" placeholder="Search users" />
        </div>
        <div className="side-body">
          {userList &&
            userList?.map((user) => (
              <div
                className={`${
                  selectUser?._id === user?._id
                    ? "side-user selected"
                    : "side-user"
                }`}
                onClick={() => handleSelect(user)}
                key={user?._id}
              >
                <div className="profile-img">
                  <img src={user?.profilepic} alt="" />
                  {onlineUsers.includes(user?._id) && (
                    <span className="online">
                      <GoDotFill />
                    </span>
                  )}
                </div>
                <p>{user?.fullname}</p>
              </div>
            ))}
        </div>

        <div
          className={`${logoutToggle ? "popup toggle" : "popup"}`}
          onClick={handleLogout}
        >
          <p>Logout</p>
          <span>
            <RiLogoutBoxFill />
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
