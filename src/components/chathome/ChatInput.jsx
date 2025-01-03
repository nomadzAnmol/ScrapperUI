import React from "react";
import { BiSend } from "react-icons/bi";

const ChatInput = ({ input, setInput, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type your query..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>
        <BiSend size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
