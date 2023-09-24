export interface MessageProps {
  role: string;
  content: string;
}

function Message({ role, content }: MessageProps) {
  return (
    <div className={role + "-row"}>
      {role == "assistant" && (
        <img
          src="https://pluspng.com/img-png/book-png-book-stack-png-image-25686-1024.png"
          width="75px"
          height="75px"
        />
      )}
      <div className={role + "-msg"}>{content}</div>
    </div>
  );
}

export default Message;
