import MessageList from "./MessageList";
import UserInput from "./UserInput";
import { MessageProps } from "./Message";
import { useState, useEffect } from "react";

function ChatContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const postResult = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8888/");
    xhr.setRequestHeader("Content-Type", "application/json");
    let messageArr = [];
    for (let message of messages) {
      messageArr.push(message);
    }
    const data = JSON.stringify({ title: "frank_test", messages: messageArr });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Result sent successfully");
        } else {
          console.error("Error sending result:", xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send(data);
  };

  const onSendMessage = (message: string, sender: string) => {
    const newMessage = { role: sender, content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
     // Scroll to bottom                                                                                
    setTimeout(() => {                                                                                 
      const chatContainer = document.querySelector(".chat-container");                                 
      const messageList = document.querySelector(".message-list");                                     
      if(chatContainer && messageList)                                                                 
        chatContainer.scrollTo(0, messageList.scrollHeight);                                           
      }, 50);                                                                                          
    
  };

  

  useEffect(() => {
    console.log("Updated messages", messages);
    postResult();
  }, [messages]);

  

  return (
    <div className='chat-container-1'>
      <div className="chat-container">
        <MessageList messages={messages} />
      </div>
      <UserInput onSendMessage={onSendMessage} />
    </div>
    
  );
}

export default ChatContainer;
