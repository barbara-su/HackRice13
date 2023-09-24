import React, { useState, useEffect, useRef } from "react";


declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UserInputProps {
  onSendMessage: (message: string, sender: string) => void;
}

function UserInput({ onSendMessage }: UserInputProps) {
  const [message, setMessage] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prevMessage) => prevMessage + transcript);
      };
      recognition.onend = () => {
        setIsListening(false);
        handleSendMessage();
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  async function handleSendMessage() {
    if (message.trim() !== "") {
      onSendMessage(message, "user");
      toggleListening();
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

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  return (
    <div className="user-input">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
      <button className="listen-button" onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
}

export default UserInput;