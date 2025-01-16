import React, { useState, useEffect, useRef } from "react";
import Message from "./message";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Bạn cần giúp gì không?", isSent: false, timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatWindowRef = useRef(null);

  // Cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Thêm tin nhắn gửi đi
      setMessages([...messages, { text: inputMessage, isSent: true, timestamp: new Date() }]);
      setInputMessage("");

      // Giả lập phản hồi tự động
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Đã nhận được tin nhắn của bạn!", isSent: false, timestamp: new Date() },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="card chat-window-card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Chat với INQ</h5>
        <button className="btn btn-sm btn-light" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>
      </div>
      <div className="card-body chat-window" ref={chatWindowRef}>
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isSent={message.isSent}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tin nhắn..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;