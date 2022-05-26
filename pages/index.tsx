import type { NextPage } from "next";
import Head from "next/head";
import CityTabs from "../components/CityTabs";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import FavouritesList from "../components/FavouritesList";
import { useFavouritesContext } from "../context/FavouritesContextProvider";

const Home: NextPage = () => {
  const { showFavourites } = useFavouritesContext();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CityTabs showFavourites={showFavourites}></CityTabs>
      {showFavourites && <FavouritesList />}
    </>
  );
};

export default Home;
