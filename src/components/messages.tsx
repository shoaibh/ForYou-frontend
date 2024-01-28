import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { useAuth } from "@/utils/AuthProvider";
import { Message } from "./message";

export const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useAuth();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m, id) => (
        <Message message={m} key={id} />
      ))}
    </div>
  );
};