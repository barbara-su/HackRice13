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
        window.speechSynthesis.cancel();
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

  return (
    <div className="user-input">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="send-button" onClick={() => handleSendMessage(message)}>
        Send
      </button>
    </div>
  );
}

export default UserInput;
