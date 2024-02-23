import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import sendIcon from "../components/sendIcon";

import showEmoji from "../utils/showEmoji";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isConnectionOpen, setConnectionOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  const { username } = useParams();
  const ws = useRef();

  const sendMessage = () => {
    if (messageBody) {
      ws.current.send(
        JSON.stringify({
          sender: username,
          body: messageBody,
        })
      );
      setMessageBody("");
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      console.log("Connection Opened");
      setConnectionOpen(true);
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((_messages) => [..._messages, data]);
      showEmoji(data);
    };
    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    sendMessage();
  }, [messageBody]);

  return (
    <Layout>
      <footer className="w-1/3">
        <div className="flex justify-center">
          <button
            aria-label="Send"
            onClick={() => {
              setMessageBody("💩");
            }}
            className="m-3 text-9xl z-10"
            disabled={!isConnectionOpen}
          >
            💩
          </button>
        </div>
      </footer>
      <div id="emoji-container" className="w-full">
        {/* {messages.map((message, index) => (
          <div
            key={index}
            className={`floating-emoji-container flex`}
            style={{ left: `${message.horizontalPosition}vw` }}
          >
            <div className="floating-emoji">{message.body}</div>
          </div>
        ))} */}
      </div>
    </Layout>
  );
};

export default ChatPage;
