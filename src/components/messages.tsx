import { doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
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

  const lastMessageRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 shadow-inner">
      {messages?.map((msg: any, index: number) => {
        const lastMessage = messages?.length - 1 === index;
        return (
          <div key={index} ref={lastMessage ? lastMessageRef : null} className="mb-3">
            <Message message={msg} key={index} isOwn={data.user.uid === msg.senderId} />
          </div>
        );
      })}
    </div>
  );
};
