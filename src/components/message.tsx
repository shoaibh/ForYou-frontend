import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

export const Message = ({ message, isOwn }: { message: any; isOwn: boolean }) => {
  // const { currentUser, data } = useAuth();

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const messageClass = clsx(
    "text-sm w-fit overflow-hidden pt-[5px] pb-[5px] pl-[10px] pr-[10px] rounded-md",
    isOwn ? "bg-sky-500 text-white  rounded-br-none" : "bg-gray-100 text-black rounded-bl-none",
  );

  const time = clsx("text-[10px] flex", isOwn ? "text-slate-200 justify-end" : "text-slate-500 justify-start");

  return (
    <div className={body}>
      <div className={messageClass}>
        <div>{message.text}</div>
        <div className={time}>{message?.date && format(message?.date.seconds, "p")}</div>
      </div>
    </div>
  );
};
