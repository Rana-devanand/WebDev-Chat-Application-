import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputEmoji from "react-input-emoji";

function Chat() {
  const [chatUserName, setChatUserName] = useState(
    localStorage.getItem("username")
  );
  const [to_roomId, set_to_RoomId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const userId = localStorage.getItem("userId");
  const [storeConnectionId, setStoreConnectionId] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [connect_user_room_id, setConnectUserRoomId] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);

  // Get all users list
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`
      );
      // console.log(response);
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveUser = async (userId) => {
    setActiveUser(userId);
    set_to_RoomId(userId);
    setWelcomeMessage(false);
    const selectedUser = usersList.find((user) => user._id === userId);
    setChatUserName(usersList.find((user) => user._id === userId).name);
    if (selectedUser) {
      setConnectUserRoomId(selectedUser.roomId);
    } else {
      toast.error("User not found in usersList");
      return;
    }
    checkConnectionId(selectedUser.roomId, connect_user_room_id);
    JoinRoom();
  };

  useEffect(() => {
    if (storeConnectionId) {
      setWelcomeMessage(false);
    }
    getUsers();
  }, []);

  const generateConnectionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  //---------------------------------------------------------------------------------------

  // console.log("storeConnectionId", storeConnectionId);

  // check connetion is Already exist or not
  const checkConnection = async () => {
    const from_room_id = localStorage.getItem("roomId");
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/getallconnectionid/${connect_user_room_id}/${from_room_id}`
    );
    console.log("checkConnection response", response.data);
    if (response.data.data !== null) {
      return response.data.data.connection_id;
    } else if (response.data.data === null) {
      const connection_id = generateConnectionId();
      return connection_id;
    }
  };

  // Check connection id for chat
  const checkConnectionId = async (roomId) => {
    const from_room_id = localStorage.getItem("roomId");
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/getallconnectionid/${from_room_id}/${roomId}`
    );
    if (response.data.data === null) {
      toast.error("No connection channel found");
      setStoreConnectionId("");
    } else {
      setStoreConnectionId(response.data.data.connection_id);
    }
  };

  // Create connection id
  const handleCreateConnectionId = async () => {
    try {
      const createConnectionId = await checkConnection();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create_connection_id`,
        {
          from_room_id: localStorage.getItem("roomId"),
          to_room_id: connect_user_room_id,
          connection_id: createConnectionId,
        }
      );
      console.log("response", response);
      setStoreConnectionId(createConnectionId);
      toast.success("Connection channel created successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("Error creating connection id");
    }
  };

  // get messages by connection id
  const getMessagesByConnectionId = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/get_messages_by_connection_id/${storeConnectionId}`
    );
    // console.log("response", response.data);
    setListMessages(response.data);
  };

  useEffect(() => {
    getMessagesByConnectionId();
  }, [storeConnectionId]);

  // Socket connection for chat
  const ENDPOINT = "http://localhost:5000";
  const socket = io(ENDPOINT);
  useEffect(() => {
    socket.on("message", (data) => {
      // console.log("Message received : ", data);
    });
  }, []);

  const JoinRoom = async () => {
    if (storeConnectionId) {
      socket.emit("join_room", {
        roomId: storeConnectionId,
        username: localStorage.getItem("username"),
      });
    }
  };

  const formRef = useRef(null);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create_message`,
        {
          roomId: storeConnectionId,
          message: message,
          username: localStorage.getItem("username"),
        }
      );
      getMessagesByConnectionId();
      setMessage("");
      formRef.current.reset();
      socket.emit("message_send", {
        roomId: storeConnectionId,
        message: message,
        username: localStorage.getItem("username"),
      });
      console.log("response", response);
    } catch (error) {
      toast.error("Error sending message");
      console.log("error", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="ml-24 flex ">
        <div className="Users-list w-1/5 h-[550px] shadow-[4px_0px_8px_rgba(0,0,0,0.2)] bg-[#f1f1f1] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <h3 className="text-blue-600 font-semibold text-xl p-2">Chats</h3>
          {usersList.map((data, index) => (
            <button
              key={index}
              onClick={() => handleActiveUser(data._id)}
              className={`border-b-2 hover:bg-zinc-200 w-full flex justify-start items-center ${
                data._id === activeUser ? "bg-blue-300" : ""
              }`}
            >
              <div className="avatar border rounded-full ml-2 p-2">
                <img
                  className="w-10 h-10"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png"
                />
              </div>
              <div className="user-details p-4 px-3">
                <h4 className="text-blue-600 font-semibold">{data.name}</h4>
                <p className="text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  {data.status} online
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="messages w-full relative ">
          <div className="absolute inset-0 z-0">
            <img
              src="https://www.shutterstock.com/image-vector/social-media-sketch-vector-seamless-600nw-1660950727.jpg"
              alt="background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          {storeConnectionId ? (
            <>
              <div className="header w-[100%] p-3 h-16  flex items-center justify-between bg-[#3B82F6] relative z-10  border-b-4">
                <img
                  className="w-10 h-10"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png"
                />
                <div className="user p-2 font-semibold text-xl text-zinc-100 w-full m-auto">
                  {chatUserName}
                </div>
                <div className="msg font-extrabold text-lg flex gap-4 mr-10 text-white">
                  <button>
                    <MdVideoCall style={{ fontSize: 25 }} />
                  </button>
                  <button>
                    <FaPhoneAlt />
                  </button>
                </div>
              </div>

              <div className="message-list w-[80%] m-auto h-[380px] p-3  border-b-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                <div className="messages relative">
                  <div className="relative z-10">
                    <div className="from text-blue-600 font-semibold justify-start text-left">
                      {listMessages.map((message, index) => {
                        const isCurrentUser =
                          message.username === localStorage.getItem("username");
                        return (
                          <div
                            key={index}
                            className={`flex ${
                              isCurrentUser ? "justify-end" : "justify-start"
                            } mb-2`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                isCurrentUser
                                  ? "bg-blue-600 text-white ml-auto"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              <div className="break-words text-sm">
                                {message.message}
                              </div>
                              <div className="text-xs mt-1 text-[#454545ec]">
                                {isCurrentUser ? (
                                  <p className="text-xs mt-1 text-[#ffffffba]">
                                    {new Date(
                                      message.createdAt
                                    ).toLocaleString()}
                                  </p>
                                ) : (
                                  <p className="text-xs mt-1 text-[#454545ec]">
                                    {new Date(
                                      message.createdAt
                                    ).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="to text-blue-600 font-semibold justify-end text-right">
                      {/* Remove duplicate message mapping since we're handling both sent/received above */}
                    </div>
                  </div>
                </div>
              </div>
              {/* User message input */}

              <form
                action=""
                onSubmit={handleSendMessage}
                ref={formRef}
                className="relative z-10"
              >
                <div className="w-[80%] m-auto flex items-center p-2">
                  <InputEmoji
                    value={message}
                    placeholder="Type your message here..."
                    className="flex-grow px-3 py-5 border-none focus:outline-none text-lg !important"
                    onChange={(e) => setMessage(e)}
                    onEnter={(e) => {
                      handleSendMessage(e);
                    }}
                  />
                  <button
                    className="ml-3 mr-3 px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                    title="Send"
                    type="submit"
                  >
                    <IoSend style={{ fontSize: 25 }} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="start-chat w-[80%] flex flex-col justify-center items-center m-auto h-[380px] border-b-4">
              {welcomeMessage ? (
                <p className="text-blue-600 font-semibold text-2xl">
                  Welcome to Chat App
                </p>
              ) : (
                <>
                  <p className="text-blue-600 font-semibold text-2xl">
                    No connection channel found
                  </p>
                  <button
                    className="relative px-4 py-2 rounded-md  bg-green-700 text-white font-semibold text-lg mt-5"
                    onClick={handleCreateConnectionId}
                  >
                    Create Connection
                  </button>
                </>
              )}
            </div>
          )}

          {/*  Start Chat */}
        </div>
      </div>
    </>
  );
}

export default Chat;
