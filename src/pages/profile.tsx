import FaceDetection from "@/components/face-detection";
import { Header } from "@/components/header";

export const Profile = () => {
  return (
    <div className="bg-slate-50 flex justify-center h-screen relative">
      <FaceDetection />
    </div>
  );
};
