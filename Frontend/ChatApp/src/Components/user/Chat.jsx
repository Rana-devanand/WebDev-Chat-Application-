import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
function Chat() {
  const [chatUserName , setChatUserName] = useState(localStorage.getItem("username"));
  const [usersList , setUsersList] = useState([]);
  const userId = localStorage.getItem("userId");

  const getUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`);
      console.log(response);
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const [activeUser , setActiveUser] = useState("");
  const handleActiveUser = (userId) => {
    setActiveUser(userId);
    setChatUserName(usersList.find(user => user._id === userId).name);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="ml-24 flex ">
        <div className="Users-list w-1/5 h-[550px] shadow-[4px_0px_8px_rgba(0,0,0,0.2)] bg-[#7E99A3] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {usersList.map((data, index) => (
            <button
              key={index}
              onClick={() => handleActiveUser(data._id)}
              className={`border-b-2 hover:bg-blue-300 w-full flex justify-start items-center ${data._id === activeUser ? "bg-blue-400" : ""}`}
            >
              <div className="avatar border rounded-full ml-2 p-2">
                <img
                  className="w-10 h-10"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png" />
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
        <div className="messages w-full">

          <div className="header w-[90%] mt-5 h-12 m-auto flex items-center justify-between  border-b-4" >
            <div className="user p-2 font-semibold text-blue-600">
                {chatUserName}
            </div>
            <div className="msg font-extrabold text-lg flex gap-4 mr-5">
              <button ><MdVideoCall style={{ fontSize: 25 }} /></button>
              <button><FaPhoneAlt /></button>
            </div>
          </div>

          <div className="message-list w-[80%] m-auto h-[380px] border-b-4">
            <h1>From </h1>
            <h1>To</h1>
          </div>

          <form action="">
            <div className="w-[80%] m-auto flex items-center p-1">

              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-grow px-4 py-4 border-none focus:outline-none  text-lg"
              />
              <button
                className="ml-3 mr-3 px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                title="Send"
              >
                <IoSend style={{ fontSize: 25 }} />
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default Chat;
