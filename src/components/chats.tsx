import { debounce } from "../lib/helpers";
import { db } from "../firebase.config";
import { useAuth } from "@/utils/AuthProvider";
import { collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState<
    Array<{ uid: string; displayName: string }>
  >([]);

  const [chatsToShow, setChatsToShow] = useState<
    Array<{ uid: string; displayName: string }>
  >([]);

  const { currentUser, dispatch, data } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const usersData: any = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Exclude the currently authenticated user from the results
        if (currentUser && doc.id !== currentUser.uid) {
          usersData.push({
            id: doc.id,
            ...userData,
          });
        }
      });
      setChats(usersData);
      setChatsToShow(usersData);
    });
    return () => unsubscribe();
  }, []);

  const handleSelect = async (user: any) => {
    const chatId =
      currentUser!.uid > user.uid
        ? currentUser!.uid + user.uid
        : user.uid + currentUser!.uid;

    console.log("handle", { chatId, currentUser })

    dispatch({ type: "CHANGE_USER", payload: { user: { ...user }, chatId } });



    try {
      const res = await getDoc(doc(db, "chats", chatId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", chatId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser!.uid), {
          [chatId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [chatId + ".userInfo"]: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }
    finally {
    navigate(`/chat/${chatId}`);

    }

  };

  const [username, setUsername] = useState("");

  const debouncedF = useCallback(
    debounce((value) => {
      console.log({ value });

      const updatedChats = chats.filter((chat) =>
        chat.displayName.includes(value)
      );
      setChatsToShow(updatedChats);
    }, 300),
    [chats]
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Find a user"
        onChange={(e) => {
          setUsername(e.target.value);

          if (!!e.target.value) {
            debouncedF(e.target.value);
          }
        }}
        value={username}
        className="w-full p-[10px]"
      />
      <div className="mt-[20px] text-start">
        {chatsToShow?.map((chat) => (
          <div
            className="p-[20px] border-slate-400 border border-solid hover:bg-sky-700 cursor-pointer mb-[10px]"
            key={chat.uid}
            onClick={() => handleSelect(chat)}
          >
            <div className="userChatInfo">
              <span>{chat.displayName}</span>
              {/* <p>{chat[1]?.text}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;