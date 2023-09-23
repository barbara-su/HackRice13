import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: MessageProps[];
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
    </div>
  );
}

export default MessageList;
