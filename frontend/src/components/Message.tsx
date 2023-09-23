export interface MessageProps {
  role: string;
  content: string;
}

function Message({ role, content }: MessageProps) {
  return <div className={role}>{content}</div>;
}

export default Message;
