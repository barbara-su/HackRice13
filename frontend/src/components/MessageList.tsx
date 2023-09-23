import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: MessageProps[];
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
}

export default MessageList;
