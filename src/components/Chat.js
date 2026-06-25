import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../firebase-config";
import "../styles/chat.css";

export const Chat = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const unsubscribe = onSnapshot(messageRef, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredMessages = messageList.filter(
        (message) => message.room === room
      );

      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <p className="empty-chat">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => (
            <div className="message" key={message.id}>
              <div className="message-user">
                {message.user}
              </div>

              <div className="message-text">
                {message.text}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};