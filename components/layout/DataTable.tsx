import { Typography, Box, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { getForecast } from "../../services/services";
import CityTabs from "../CityTabs";
import { useCityContext } from "../../context/CityContextProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormattedMessage, useIntl } from "react-intl";
import LanguageSelector from "../LanguageSelector";
import { useLanguageContext } from "../../context/LanguageContextProvider";
import { useToolTipContext } from "../../context/ToolTipContextProvider";
import Star from "@mui/icons-material/Star";
import Tutorial from "../Tutorial";
import FavouritesList from "../FavouritesList";
import { useFavouritesContext } from "../../context/FavouritesContextProvider";

const DataTable = () => {
  const [formInput, setformInput] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const [geolocation, setGeolocation] = useState<string>("");

  const { city, setCity } = useCityContext();
  const { locale } = useLanguageContext();
  const { activeSteps, setActiveSteps } = useToolTipContext();
  const { favourites, showFavourites, setShowFavourites } =
    useFavouritesContext();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformInput(e.target.value);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    setIsBlur(false);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsBlur(true);
    setIsFocus(false);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getForecast(formInput, locale).then((response) => {
      setCity({
        name: response.location.name,
        forecast: response.forecast.forecastday,
      });

      setformInput("");
      setIsInputValid(false);
      setIsBlur(false);
    });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      getForecast(formInput, locale)
        .then((res) => {
          if (res.location.name) {
            setIsInputValid(true);
          }
        })
        .catch((err) => {
          setIsInputValid(false);
        });
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [formInput, isFocus, isBlur]);

  useEffect(() => {
    getForecast(city.name, locale).then((response) => {
      setCity({
        name: response.location.name,
        forecast: response.forecast.forecastday,
      });
    });
  }, [locale]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeolocation(
        `${position.coords.latitude.toString()},${position.coords.longitude.toString()}`
      );
    });
    let presetLocation;
    if (geolocation) {
      presetLocation = geolocation;
    } else if (locale === "fr") {
      presetLocation = "Paris";
    } else {
      presetLocation = "London";
    }
    getForecast(presetLocation, locale).then((response) => {
      setCity({
        name: response.location.name,
        forecast: response.forecast.forecastday,
      });
    });
  }, [geolocation]);

  const theme = createTheme();

  theme.typography.h4 = {
    "@media (min-width:600px)": {
      marginBottom: "0.5rem",
      fontSize: "2rem",
    },
    "@media (min-width:350px)": {
      marginBottom: "0.5rem",
      fontSize: "2rem",
    },

    fontFamily: "Roboto",
  };

  const intl = useIntl();

  const elementRef: any = useRef();

  return (
    <div>
      {/* <Steps
        enabled={enabled}
        steps={activeSteps}
        initialStep={0}
        onExit={onExit}
        ref={elementRef}
        onBeforeChange={(nextStepIndex) => {
          if (nextStepIndex === 2) {
            elementRef.current.updateStepElement(nextStepIndex);
          } else if (nextStepIndex === 3) {
            console.log("in");
            elementRef.current.updateStepElement(nextStepIndex);
          }
        }}
        options={{
          overlayOpacity: 0.5,
          showProgress: false,
          showBullets: true,
          disableInteraction: false,
        }}
      /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: ".5rem",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h4" color={"white"} marginRight={3}>
            <FormattedMessage id="app.title" defaultMessage="WeatherApp" />
          </Typography>
        </ThemeProvider>
        <form onSubmit={handleOnSubmit} className="cityInputForm">
          <label htmlFor="city_input"></label>

          <input
            id="city_input"
            className={
              !isInputValid && isBlur
                ? "invalid_input"
                : isInputValid && isFocus
                ? "valid_input"
                : "unselected"
            }
            type="text"
            value={formInput}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder={intl.formatMessage({ id: "app.placeholder" })}
          />

          <Button
            id="cityBtn"
            type="submit"
            disabled={isInputValid ? false : true}
          >
            <FormattedMessage
              id="app.selectCityButton"
              defaultMessage="Select City"
            />
          </Button>
        </form>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            justifyContent: "center",
            marginTop: { xs: "1rem", lg: "0" },
          }}
        >
          <LanguageSelector />
          <Box
            sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}
          >
            <Tutorial />
            <Star
              sx={{ color: "gold", marginLeft: 3, fontSize: "2rem" }}
              onClick={() => setShowFavourites(!showFavourites)}
              id="favouritesStar"
            />
          </Box>
        </Box>
      </Box>
      <Box className="error_message">
        {!isInputValid && isBlur && (
          <p>
            <FormattedMessage
              id="dataTable.errorMessage"
              defaultMessage={"Please Enter a Valid Location"}
            />
          </p>
        )}
      </Box>
      {/* <CityTabs showFavourites={showFavourites}></CityTabs>
      {showFavourites && <FavouritesList />} */}
    </div>
  );
};

export default DataTable;
