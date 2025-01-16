import React, { useState } from "react";
import ChatWidget from "../../../component/Shared/Chat/chatWidget";


function LayoutChat() {
  return (
    <div>
      <h1 className="text-center mt-5">Ứng dụng Chat Widget</h1>
      <ChatWidget />
    </div>
  );
}

export default LayoutChat;