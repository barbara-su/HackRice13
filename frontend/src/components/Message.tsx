export interface MessageProps {
  role: string;
  content: string;
}

function Message({ role, content }: MessageProps) {
  return <div className={role + "-row"}><div className={role + "-msg"}>{content}</div></div>;
}

export default Message;
