export const mockData = [
  {
    name: "Ranjit",
    userId: "adjskfl",
    img: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    lastMessage: "kaha hai",
  },
  {
    name: "Ankit",
    userId: "rQMbtrfMj0eETRoXV9gOFcVkXgk17BtvYttkbSQXhJnDzdC7ao3zU0r1",
    img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    lastMessage: "aaya",
  },
];

export const fetchFriends = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};
