import { createContext } from "react";
export const CurrentUserContext = createContext({
  about: "BB",
  avatar: "https://avtomarket.ru/stuff/gallery/12554/b_200911.jpg",
  name: "Roman",
});

export const currentUser = {
  about: "BB",
  name: "Roman",
};

export default CurrentUserContext;
