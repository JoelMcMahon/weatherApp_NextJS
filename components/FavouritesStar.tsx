import React, { useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavouritesContext } from "../context/FavouritesContextProvider";
import { useCityContext } from "../context/CityContextProvider";
import Star from "@mui/icons-material/Star";

const FavouritesStar: React.FC = () => {
  const { favourites, setFavourites } = useFavouritesContext();
  const { city } = useCityContext();

  const cityIsFavourited = favourites.some(
    (favourite) => favourite.name === city.name
  );

  const handleAddToFavourites = () => {
    if (cityIsFavourited) {
      console.log("in");
      let newFavourites = favourites.filter(
        (favourite) => favourite.name !== city.name
      );
      setFavourites(newFavourites);
    } else {
      setFavourites((currentValue) => [...currentValue, city]);
    }
  };

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")!);

    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <div id="addToFavourites">
      {cityIsFavourited ? (
        <Star
          onClick={handleAddToFavourites}
          sx={{ color: "gold", fontSize: "2rem", marginLeft: "1rem" }}
        />
      ) : (
        <StarBorderIcon
          onClick={handleAddToFavourites}
          sx={{ fontSize: "2rem", marginLeft: "1rem" }}
        />
      )}
    </div>
  );
};

export default FavouritesStar;
