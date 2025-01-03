import React from "react";
import { BiPlus } from "react-icons/bi";

const Sidebar = ({ 
  user, 
  chatHistory, 
  selectedChat, 
  setSelectedChat, 
  startNewChat, 
  handleLogout 
}) => {
  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <button onClick={startNewChat}>
          <BiPlus size={20} /> New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="chat-history">
        <h4>Chat History</h4>
        <ul>
          {chatHistory.map((chat, index) => (
            <li
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={selectedChat?._id === chat._id ? "active" : ""}
            >
              {chat.title || `Session ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>

      {/* User Info */}
      <div className="user-details">
        {user ? (
          <>
            <p>Welcome, {user.name || user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>
            Please{" "}
            <span 
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleLogout}
            >
              log in
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
