import React, { useContext, createContext, useState } from "react";
import {
  IFavouritesContext,
  ICity,
  IFavouritesContextProvider,
} from "../interfaces/interfaces";

export const FavouritesContext = createContext<IFavouritesContext>({
  favourites: [],
  setFavourites: () => {},
  showFavourites: false,
  setShowFavourites: () => {},
});

export const useFavouritesContext = () => useContext(FavouritesContext);

const FavouritesContextProvider: React.FC<IFavouritesContextProvider> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<ICity["cities"]>([]);
  const [showFavourites, setShowFavourites] = useState<boolean>(false);

  const value = {
    favourites,
    setFavourites,
    showFavourites,
    setShowFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
