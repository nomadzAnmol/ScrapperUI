import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";

const MessageList = ({ messages, messageEndRef }) => {
  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
          {msg.role === "user" ? (
            <BiSolidUserCircle size={24} />
          ) : (
            <img src="chatbot_logo.png" alt="Bot" className="bot-logo" />
          )}
          <p>{msg.content}</p>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
