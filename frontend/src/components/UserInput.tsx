import React, { useState } from "react";

interface UserInputProps {
  onSendMessage: (message: string) => void;
}

async function fetchResponse() {
  const response = await fetch("http://localhost:8000/");
  const content = JSON.parse(JSON.stringify(response));
  return content;
}

function UserInput({ onSendMessage }: UserInputProps) {
  const [message, setMessage] = useState<string>("");

  async function handleSendMessage() {
    if (message.trim() !== "") {
      onSendMessage(message);
      const assistantContent = await fetchResponse();
      onSendMessage(assistantContent);
      setMessage("");
    }
  }

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
