import { useEffect, useState } from "react";
import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: MessageProps[];
}

function MessageList({ messages }: MessageListProps) {
  const [introLoaded, setIntroLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const chatContainer = document.querySelector(".chat-container");
      const messageList = document.querySelector(".message-list");
      if (chatContainer && messageList)
        chatContainer.scrollTo(0, messageList.scrollHeight);
    }, 50);
    if (!introLoaded) {
      speak(content);
      setIntroLoaded(true);
    }
  });

  const speak = (sentence: string) => {
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = sentence;
    utterance.voice = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang == "en-US")[0];
    window.speechSynthesis.speak(utterance);
  };

  const content = `The book discusses various concepts related to vector spaces and their applications. Here are the main sections covered in the book: The Basic Vector Space; Algebra and Geometry Interplay; Collinear and Coplanar Points; Parallelograms and Quadrilaterals; Generalization and General Position. Based on this table of contents, you can tell me what information or tasks you would like me to focus on from the book.`;

  return (
    <div className="message-list">
      <Message key={0} role="assistant" content={content} />
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
    </div>
  );
}

export default MessageList;
