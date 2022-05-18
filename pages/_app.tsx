import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import CityContextProvider from "../context/CityContextProvider";
import LanguageContextProvider from "../context/LanguageContextProvider";
import ToolTipContextProvider from "../context/ToolTipContextProvider";
import FavouritesContextProvider from "../context/FavouritesContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FavouritesContextProvider>
        <ToolTipContextProvider>
          <LanguageContextProvider>
            <CityContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CityContextProvider>
          </LanguageContextProvider>
        </ToolTipContextProvider>
      </FavouritesContextProvider>
    </>
  );
}

export default MyApp;
