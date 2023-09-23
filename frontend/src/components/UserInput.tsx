import React, { useState } from "react";

interface UserInputProps {
  onSendMessage: (message: string) => void;
}

function UserInput({ onSendMessage }: UserInputProps) {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="user-input">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default UserInput;
