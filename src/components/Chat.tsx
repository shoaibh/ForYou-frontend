import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider";
import { Messages } from "./messages";
import { Input } from "./input";
import { collection, doc as docs, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const Chat = () => {
  const { id } = useParams();

  // Use the 'id' parameter to fetch chat room data, display the chat, etc.

  const { data, dispatch, currentUser } = useAuth();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (id && currentUser) {
      const unsubscribe = onSnapshot(docs(db, "chats", id), async (doc) => {
        if (doc.exists()) {
          const userId = doc.data().users.filter((user:any)=>user!==currentUser.uid)[0]
          console.log("==", { user })
          
          if (userId) {
            // Fetch user details from the 'users' collection based on the obtained userId
            const userDocRef = docs(db, 'users', userId);
            const userDocSnapshot = await getDoc(userDocRef);
      
            if (userDocSnapshot.exists()) {
              const userI = userDocSnapshot.data();
              console.log("User Details:", user);

              setUser(userI)
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

  console.log("==", { data, id, user });

  return (
    <div>
      <h2>Chat Room ID: {id}</h2>
      {/* Render your chat components here */}

      <div className="chat">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatIcons">
            {/* <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" /> */}
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </div>
  );
};
