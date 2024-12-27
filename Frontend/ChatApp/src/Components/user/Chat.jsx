import React from "react";
import { IoSend } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
function Chat() {
  const usersList = [
    {
      id: 1,
      name: "Karan",
      avatar: "user1.jpg",
      status: "online",
      message: "Welcome to the chat room",
    },
    {
      id: 2,
      name: "Arjun",
      avatar: "user2.jpg",
      status: "online",
      message: "Welcome to the chat room",
    },
    {
      id: 1,
      name: "prem",
      avatar: "user1.jpg",
      status: "online",
      message: "Welcome to the chat room",
    },
    {
      id: 2,
      name: "surya",
      avatar: "user2.jpg",
      status: "online",
      message: "Welcome to the chat room",
    },

  ];
  return (
    <>
      <div className="ml-24 flex ">
        <div className="Users-list w-1/5 h-[550px] shadow-[4px_0px_8px_rgba(0,0,0,0.2)] bg-[#78B3CE] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {usersList.map((data, index) => (
            <button
              key={index}
              className="border-b-2 hover:bg-blue-400 w-full flex justify-start items-center  "
            >
              <div className="avatar border rounded-full ml-2 p-2">
                <img
                  className="w-10 h-10"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png" />
              </div>
              <div className="user-details p-4 px-3">
                <h4>{data.name}</h4>
                <p className="text-green-600 font-semibold">
                  <span className="text-green-600 font-semibold text-2xl mt-10"></span>
                  {data.status}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="messages w-full">

          <div className="header w-[90%] mt-5 h-12 m-auto flex items-center justify-between  border-b-4" >
            <div className="user p-2 font-semibold text-blue-600">
              UserName
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
