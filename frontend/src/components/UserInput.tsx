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
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (recognition) {
      const recognitionInstance = new recognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;

      let finalTranscript = "";

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript = event.results[i][0].transcript;
          } else {
            interimTranscript = event.results[i][0].transcript;
          }
        }

        handleSendMessage(finalTranscript);
        setMessage("");
        finalTranscript = "";
      };

      recognitionInstance.onend = () => {
        if (listening) {
          recognitionInstance.start();
        }
      };

      recognitionInstance.start();
      setListening(true);

      return () => {
        console.log("Cleanup function executed.");
      };
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }, [recognition]);

  async function handleSendMessage(text: string) {
    if (text.trim() !== "") {
      onSendMessage(text, "user");
      setMessage("");
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
        console.log(responseObj);
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
      <button className="send-button" onClick={(message) => handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default UserInput;
