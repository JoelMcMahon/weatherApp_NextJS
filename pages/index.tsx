import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CityTabs from "../components/CityTabs";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import FavouritesList from "../components/FavouritesList";

const Home: NextPage = () => {
  const [showFavourites, setshowFavourites] = useState<boolean>(false);

  return (
    <>
      <CityTabs showFavourites={showFavourites}></CityTabs>
      {showFavourites && <FavouritesList />}
    </>
  );
};

export default Home;
