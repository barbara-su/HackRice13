import { useEffect } from "react";
import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: MessageProps[];
}

function MessageList({ messages }: MessageListProps) {
  useEffect(() => {
    setTimeout(() => {
      const chatContainer = document.querySelector(".chat-container");
      const messageList = document.querySelector(".message-list");
      if (chatContainer && messageList)
        chatContainer.scrollTo(0, messageList.scrollHeight);
    }, 50);
    
  });
  const speak = (sentence:any) => {
    let utterance = new SpeechSynthesisUtterance();
  
    utterance.text = sentence;
    utterance.voice = window.speechSynthesis.getVoices().filter(voice => voice.lang == "en-US")[0];
  
    window.speechSynthesis.speak(utterance);
  }
  const content = `The book discusses various concepts related to vector spaces and their applications. Here is a summary of the main sections covered in the book:\n\n1. The Basic Vector Space:\n - Introduction to the Cartesian product and notation for points/vectors in R^n.\n - Definition of algebraic operations (addition, scalar multiplication, subtraction, etc.).\n - Introduction to the origin (point zero) and its properties.\n - Overview of algebraic rules and their validity in vector spaces.\n\n2. Algebra and Geometry Interplay:\n - Exploring the relationship between algebraic formulas and geometric objects.\n - Understanding the connection between points/vectors in higher dimensions and their geometric representations.\n - Highlighting the simplicity of algebraic equations for lines and planes in higher-dimensional spaces.\n\n3. Collinear and Coplanar Points:\n - Definitions and properties of collinear points (points lying on the same line).\n - Examining the relationship between collinear points and the existence of certain scalars.\n - Definitions and properties of coplanar points (points lying on the same plane).\n - Investigating the conditions for points to be coplanar and expressing them using scalars.\n\n4. Parallelogram and Quadrilateral:\n - Demonstrating the property that the midpoints of the sides of a quadrilateral form the vertices of a parallelogram.\n - Examining the coplanarity of the four midpoints and expressing the center of the parallelogram in terms of the original points.\n\n5. Generalization and General Position:\n - Introduction to the concepts of copunctual points (two points coinciding) and general position.\n - Providing the definition for points to be copunctual and proving the result that copunctual points are equal.\n - Exploring the collinearity of three points in R1 and the coplanarity of four points in R2.\n - Discussing the notion of general position for random points in higher-dimensional spaces.\n\nBased on this summary, you can now let me know what specific information or tasks you would like to focus on from the book.`;
  // speak(content);
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
