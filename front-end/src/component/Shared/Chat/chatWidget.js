import React, { useState } from "react";
import ChatWindow from "./chatWindow";

const ChatWidget = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="chat-widget">
      {/* Icon chat */}
      <div className="chat-icon" onClick={toggleChat}>
        <i className="bi bi-chat-dots"></i>
      </div>

      {/* Khung chat */}
      {isChatVisible && (
        <div className="chat-window-container">
          <ChatWindow onClose={toggleChat} />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;