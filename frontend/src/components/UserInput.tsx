import React, { useState, useEffect } from "react";

interface UserInputProps {
  onSendMessage: (message: string, sender: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function UserInput({ onSendMessage }: UserInputProps) {
  const [message, setMessage] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (recognition) {
      const recognitionInstance = new recognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        handleSendMessage(transcript);
      };

      recognitionInstance.onend = () => {
        if (listening) {
          recognitionInstance.start();
        }
      };

      recognitionInstance.start();
      setListening(true);

      return () => {
        recognitionInstance.stop();
      };
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }, [recognition]);

  const handleSendMessage = (text: string) => {
    if (text.trim() !== "") {
      onSendMessage(text, "user");
      setMessage("");
      fetchResponse(text)
        .then((assistantContent) => {
          onSendMessage(assistantContent, "assistant");
        })
        .catch((error) => {
          console.error("Error fetching response:", error);
        });
    }
  };

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
        console.log(responseObj)
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