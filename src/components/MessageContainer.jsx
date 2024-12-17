import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Welcome from "./Welcome";
import { IoReturnDownBack } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { currentSelectedUser, appendMessage } from "../features/messageSlice";
import EmojiPicker from "emoji-picker-react";

const MessageContainer = ({ socket, setShowSidebar }) => {
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { token, profilepic, userid } = useSelector((state) => state?.user);
  const [showEmoji, setShowEmoji] = useState(false);

  const messageContainerRef = useRef(null);
  const dispatch = useDispatch();

  const { loading, message, selectUser } = useSelector(
    (state) => state.messages
  );

  const handleSend = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://chatapp-server-yfh2.onrender.com/user/send/message/${selectUser?._id}`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(appendMessage(res?.data?.newMessage));
      })
      .catch((err) => {
        console.log(err);
      });
    setInput("");
  };

  useEffect(() => {
    if (userid) {
      socket.emit("join", userid);
    }

    const handleNewMessage = (message) => {
      dispatch(appendMessage(message));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectUser, socket]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(Object.keys(users));
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [message]);

  const handleBack = () => {
    setShowSidebar(true);
    dispatch(currentSelectedUser(null));
  };

  return (
    <>
      {!selectUser || selectUser === null ? (
        <div className="welcome">
          <Welcome setShowSidebar={setShowSidebar} />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="msg-header">
              <div className="msg-header-details">
                <img src={selectUser?.profilepic} alt="" />
                <div>
                  <p>{selectUser?.fullname}</p>
                  {onlineUsers.includes(selectUser?._id) && (
                    <span style={{ color: "#dbdbdb", fontSize: "12px" }}>
                      online
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                  className="back"
                >
                  <IoReturnDownBack />
                </span>
              </div>
            </div>
            <div className="msg-body" ref={messageContainerRef}>
              {loading ? (
                <div className="loader"></div>
              ) : message?.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <h3 style={{ color: "#eb3678", textAlign: "center" }}>
                    Hey stranger, first time here? <br /> Let’s get this chat
                    rolling!
                  </h3>
                </div>
              ) : (
                message?.map((chat) => (
                  <div
                    className={`${
                      userid === chat?.senderID
                        ? "single-chat-own"
                        : "single-chat"
                    }`}
                    key={chat?._id}
                  >
                    {userid === chat?.senderID ? (
                      <>
                        <p className="one-chat">
                          <span className="m">{chat?.message}</span>
                          <span className="time">
                            {new Date(chat?.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </span>
                        </p>
                        <img src={profilepic} alt="" />
                      </>
                    ) : (
                      <>
                        <img src={selectUser?.profilepic} alt="" />
                        <p className="one-chat">
                          <span>{chat?.message}</span>
                          <span className="time">
                            {new Date(chat?.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            <form className="msg-footer">
              {/* <InputEmoji
                value={input}
                onChange={setInput}
                cleanOnEnter
                placeholder="Type a message"
              /> */}

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              ></input>
              <div>
                <span
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => setShowEmoji((prev) => !prev)}
                >
                  😀
                </span>
              </div>
              <button onClick={handleSend} type="submit">
                <IoSend />
              </button>
            </form>
          </div>
          <div
            style={{ display: `${showEmoji === false ? "none" : "block"}` }}
            className="emoji"
          >
            <EmojiPicker
              open={showEmoji}
              height={400}
              width={270}
              searchDisabled={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MessageContainer;
