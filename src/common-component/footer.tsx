import { FC, PropsWithChildren } from "react";

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <div className="absolute bottom-2 w-full flex">
        <div className="flex-1 ">Vibes</div>
        <div className="flex-1">Channels</div>
        <div className="flex-1">Matches</div>
        <div className="flex-1">Profile</div>
      </div>
    </>
  );
};
