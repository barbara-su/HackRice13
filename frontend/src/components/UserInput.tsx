import { useState } from "react";

interface UserInputProps {
  onSendMessage: (message: string, sender: string) => void;
}

function UserInput({ onSendMessage }: UserInputProps) {
  const [message, setMessage] = useState<string>("");

  async function handleSendMessage() {
    if (message.trim() !== "") {
      onSendMessage(message, "user");
      setMessage("");
      const assistantContent = await fetchResponse(message);
      onSendMessage(assistantContent, "assistant");
    }
  }

  async function fetchResponse(message: string) {
    try {
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      };
      const response = await fetch("https://localhost:8888/", params);
      if (response.ok) {
        const responseObj = await response.json();
        return responseObj;
      } else {
        console.error(
          "Error sending result!",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
