import { useAuth } from "@/utils/AuthProvider";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <div className="max-h-96 flex justify-between absolute top-0 w-full">
      <div>Chat Space</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
