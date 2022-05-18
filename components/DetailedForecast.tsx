import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Box } from "@mui/material";
import { useCityContext } from "../context/CityContextProvider";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { WiMoonrise } from "react-icons/wi";
import { WiMoonset } from "react-icons/wi";
import { FormattedMessage } from "react-intl";
import { useLanguageContext } from "../context/LanguageContextProvider";
import { formatAstro } from "../utils/utilFunction";
import FavouritesStar from "./FavouritesStar";

interface IProps {
  value: string;
}

const DetailedForecast: React.FC<IProps> = ({ value }) => {
  const { city } = useCityContext();
  const { locale } = useLanguageContext();

  let timezone: any;
  if (locale === "en-GB") {
    timezone = "Europe/London";
  } else if (locale === "fr") {
    timezone = "Europe/Paris";
  } else if (locale === "en-US") {
    timezone = "America/New_York";
  }

  let currentDate = new Date().toLocaleString(locale, {
    timeZone: timezone,
    hour12: locale === "en-US" ? true : false,
    timeStyle: "short",
  });
  const [time, settime] = useState<string>(currentDate);

  let cityForecast = city.forecast[parseInt(value)];
  let cityDay = cityForecast.day;

  useEffect(() => {
    const timer = setInterval(() => {
      let currentTime = new Date().toLocaleString(locale, {
        timeZone: timezone,
        hour12: locale === "en-US" ? true : false,
        timeStyle: "short",
      });
      settime(currentTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  return (
    <Grid
      container
      spacing={8}
      sx={{
        display: { sm: "block", md: "block", lg: "flex" },
        fontWeight: "100",
      }}
    >
      <Grid item xs={12} lg={4}>
        <Card
          elevation={10}
          sx={{
            border: "none",
            backgroundColor: "#064663",
            color: "white",
            p: 2,
            height: "20rem",
          }}
        >
          <Typography variant="h3" align="center" margin={1} fontWeight={100}>
            {city.name}
            <FavouritesStar />
          </Typography>

          <Typography variant="h4" align="center" fontWeight={100}>
            {cityForecast.day.avgtemp_c} ℃
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={cityForecast.day.condition.icon} alt="" />
            <Typography variant="h5" fontWeight={100}>
              {cityForecast.day.condition.text}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          elevation={10}
          sx={{
            border: "none",
            backgroundColor: "#064663",
            color: "white",
            padding: 2,
            height: "20rem",
            lineHeight: "2.5rem",
          }}
        >
          <ul>
            <li>
              <FormattedMessage
                id="detailedForecast.minTemp"
                defaultMessage={"Minimum Temperature: "}
              />
              {cityDay.mintemp_c}℃
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.maxTemp"
                defaultMessage={"Maximum Temperature: "}
              />
              {cityDay.maxtemp_c}℃
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.totalRainfall"
                defaultMessage={"Total Rainfall: "}
              />
              {cityDay.totalprecip_mm}mm
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.uvLevel"
                defaultMessage={"UV Level: "}
              />
              {cityDay.uv}
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.windSpeed"
                defaultMessage={"Maximum Wind Speed: "}
              />
              {cityDay.maxwind_kph} km/h
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.humidity"
                defaultMessage={"Average Humidity: "}
              />
              {cityDay.avghumidity}%
            </li>
            <li>
              <FormattedMessage
                id="detailedForecast.visibility"
                defaultMessage={"Average Visbility: "}
              />
              {cityDay.avgvis_km} km
            </li>
          </ul>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          elevation={10}
          sx={{
            border: "none",
            backgroundColor: "#064663",
            color: "white",
            p: 2,
            height: "20rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginLeft: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            <Grid item xs={6}>
              <Box>
                <BsSunrise />
                <FormattedMessage
                  id="detailedForecast.sunrise"
                  defaultMessage={" Sunrise:"}
                />
                <br />
                {formatAstro(cityForecast.astro.sunrise, locale)}{" "}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <BsSunset />
                <FormattedMessage
                  id="detailedForecast.sunset"
                  defaultMessage={" Sunset:"}
                />
                <br /> {formatAstro(cityForecast.astro.sunset, locale)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <WiMoonrise />
                <FormattedMessage
                  id="detailedForecast.moonrise"
                  defaultMessage={" Moonrise:"}
                />
                <br /> {formatAstro(cityForecast.astro.moonset, locale)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <WiMoonset />
                <FormattedMessage
                  id="detailedForecast.moonset"
                  defaultMessage={" Moonset:"}
                />
                <br /> {formatAstro(cityForecast.astro.moonrise, locale)}
              </Box>
            </Grid>
          </Grid>
          <Box>{time}</Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DetailedForecast;
