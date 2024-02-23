import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useState } from "react";
import { fetchFriends, mockData } from "../test/mockApi";
import { Link } from "react-router-dom";

export const Matches = () => {
  // get user from context and fetch its matches from api

  const [friends, setFriends] = useState<typeof mockData>([]);

  useEffect(() => {
    fetchFriends()
      .then((data: any) => {
        console.log("Data from API:", data);
        setFriends(data);
        // Perform actions with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        // Handle errors
      });
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-2xl p-4 pb-8">Friends</h2>
      <h3 className="text-start m-3 font-semibold text-xl">Matched</h3>
      {friends.map((friend) => (
        <Link to={`/chat/${friend.userId}`} key={friend.userId}>
          <div key={friend.userId} className="flex w-full m-3 mb-5 gap-[20px] items-center hover:bg-blue-50 p-2 cursor-pointer rounded ">
            <img
              src={friend.img}
              alt={friend.name}
              width={50}
              height={50}
              className="rounded-full overflow-hidden w-[50px] h-[50px] object-cover"
            />
            <div className="block text-start">
              <h3>{friend.name}</h3>
              <p className="opacity-60 text-sm">{friend.lastMessage}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
