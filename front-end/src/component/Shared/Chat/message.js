import React from "react";
import moment from "moment";
import "moment/locale/vi"; // Định dạng thời gian tiếng Việt

moment.locale("vi");

const Message = ({ text, isSent, timestamp }) => {
  return (
    <div className={`message ${isSent ? "sent" : "received"}`}>
      <div className="message-content">
        <p>{text}</p>
        <span className="message-time">
          {moment(timestamp).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

export default Message;