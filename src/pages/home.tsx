import { AllChats } from "@/components/all-chats";
import { Header } from "@/components/header";

export const Home = () => {
  return (
    <div className="bg-slate-50 flex justify-center h-screen relative">
      <Header />
      <AllChats />
    </div>
  );
};
