import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { MessageProps } from "./Message";
import { useState } from "react";

function ChatContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const onSendMessage = (message: string) => {
    const newMessage: MessageProps = { text: message, isUser: true };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <UserInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatContainer;
