export interface MessageProps {
  role: string;
  content: string;
}

function Message({ role, content }: MessageProps) {
  return (
    <div className={role + "-row"}>
      {role == "assistant" && (
        <img src="/icon.svg" width="75px" height="75px" />
      )}
      <div className={role + "-msg"}>{content}</div>
    </div>
  );
}

export default Message;
