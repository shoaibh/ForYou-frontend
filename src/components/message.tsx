import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useRef } from "react";

export const Message = ({ message }: { message: any }) => {
  const { currentUser, data } = useAuth();

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        currentUser && message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            currentUser && message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};
