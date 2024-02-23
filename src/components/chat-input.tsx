import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useAuth } from "@/utils/AuthProvider";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase.config";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null | undefined>(null);

  const { currentUser, data } = useAuth();

  const handleSend = async () => {
    setText("");
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            userId: data.user.uid,
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      console.log("==chats", { data });
      await updateDoc(doc(db, "chats", data.chatId), {
        users: [data.user.uid, currentUser?.uid],
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    if (currentUser) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setImg(null);
  };
  return (
    <div
      className="py-4 
    px-4 
    bg-white 
    border-t 
    flex 
    items-center 
    gap-2 
    lg:gap-4 
    w-full border border-slate-200  border-solid rounded"
    >
      <Input
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        value={text}
        className="w-full"
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files?.[0])} />
        <label htmlFor="file">{/* <img src={Img} alt="" /> */}</label>
        <Button onClick={handleSend}>
          <HiPaperAirplane size={18} className="text-white" />
        </Button>
      </div>
    </div>
  );
};
