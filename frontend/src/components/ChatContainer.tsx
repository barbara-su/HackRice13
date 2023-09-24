import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { MessageProps } from "./Message";

function ChatContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  function onSendMessage(message: string, sender: string) {
    const newMessage = { role: sender, content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTimeout(() => {
      const chatContainer = document.querySelector(".chat-container");
      const messageList = document.querySelector(".message-list");
      if (chatContainer && messageList)
        chatContainer.scrollTo(0, messageList.scrollHeight);
    }, 50);
  }

  useEffect(() => {
    const postParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "frank_test", messages: messages }),
    };

    async function postResult() {
      try {
        await fetch("http://localhost:8888/", postParams); // Prompt model w/ message history
        const res = await fetch("http://localhost:8888/"); // Get model's response
        const resData = await res.json();
        const resString = JSON.stringify(resData);
        onSendMessage(resString, "assistant");
      } catch (error) {
        throw error;
      }
    }

    if (messages.length > 0 && messages[messages.length - 1].role == "user") {
      postResult();
    }
  }, [messages]);

  return (
    <div className="chat-container-1">
      <div className="chat-container">
        <MessageList messages={messages} />
      </div>
      <UserInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatContainer;
