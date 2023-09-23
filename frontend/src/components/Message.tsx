export interface MessageProps {
  text: string;
  isUser: boolean;
}

function Message({ text, isUser }: MessageProps) {
  const messageClass = isUser ? "user-message" : "bot-message";

  return <div className={messageClass}>{text}</div>;
}

export default Message;
