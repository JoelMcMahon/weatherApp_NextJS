import Box from "@mui/material/Box";
import React from "react";
import { useFavouritesContext } from "../context/FavouritesContextProvider";

const FavouritesList: React.FC = () => {
  const { favourites } = useFavouritesContext();

  return (
    <>
      {favourites.map((favourite) => {
        return (
          <>
            <Box
              key={favourite.name}
              className="favouriteCityPanel"
              sx={{
                fontFamily: "Roboto",
              }}
            >
              <h4>{favourite.name}</h4>
              <p>{favourite.forecast[0].day.avgtemp_c}</p>
              <img
                src={favourite.forecast[0].day.condition.icon}
                className="favouriteCityPanel__conditionIcon"
              ></img>
              <p>{favourite.forecast[0].day.condition.text}</p>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default FavouritesList;
