import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider";
import { Messages } from "./messages";
import { ChatInput } from "./chat-input";
import { collection, doc as docs, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { IoIosArrowBack } from "react-icons/io";

export const Chat = () => {
  const { id } = useParams();

  // Use the 'id' parameter to fetch chat room data, display the chat, etc.

  const { data, dispatch, currentUser } = useAuth();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (id && currentUser) {
      const unsubscribe = onSnapshot(docs(db, "chats", id), async (doc) => {
        console.log("chats", { doc: doc.exists() });
        if (doc.exists()) {
          const userId = doc.data().users?.filter((user: any) => user !== currentUser.uid)[0];
          console.log("==", { user });

          if (userId) {
            // Fetch user details from the 'users' collection based on the obtained userId
            const userDocRef = docs(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              const userI = userDocSnapshot.data();
              console.log("User Details:", user);

              setUser(userI);
              // Handle the user data as needed
            } else {
              console.log("User not found.");
            }
          } else {
            console.log("No other user in the chat.");
          }
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
