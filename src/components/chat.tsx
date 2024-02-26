import { useAuth } from "@/utils/AuthProvider";
import { doc as docs, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { ChatInput } from "./chat-input";
import { Messages } from "./messages";

export const Chat = () => {
  const { id } = useParams();

  const { data, dispatch, currentUser } = useAuth();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (id && currentUser) {
      const unsubscribe = onSnapshot(docs(db, "chats", id), async (doc) => {
        if (doc.exists()) {
          const userId = doc.data().users?.filter((user: any) => user !== currentUser.uid)[0];
        }
      });
      return () => unsubscribe();
    }
  }, [id, currentUser]);

  useEffect(() => {
    if (!data?.user?.uid && user) {
      dispatch({ type: "UPDATE_CHAT_ID", payload: { user, chatId: id } });
    }
  }, [id, dispatch, user, data?.user?.uid]);

  return (
    <>
      <div className="border-b-2 border-slate-200 border-solid h-[55px] flex items-center w-full gap-[20px] pl-5">
        <Link to={`/matches`}>
          <IoIosArrowBack size={30} className="cursor-pointer" />
        </Link>
        <div className="flex items-center gap-2">
          <img src="/user_default.svg" alt={data.user?.displayName} height={30} width={30} />
          <span>{data.user?.displayName}</span>
        </div>
      </div>
      <Messages />
      <ChatInput />
    </>
  );
};
