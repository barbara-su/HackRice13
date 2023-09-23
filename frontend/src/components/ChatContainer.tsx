import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { MessageProps } from "./Message";
import { useState, useEffect } from "react";

function ChatContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  
  const onSendMessage = (message: string) => {
    const newMessage = { role: "user", content: message };
    // console.log("newmsg", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    console.log("Updated messages", messages);
  }, [messages]);

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <UserInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatContainer;
