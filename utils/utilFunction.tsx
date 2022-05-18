export const formatDate = (dateString: string, locale: string) => {
  let timezone: any;

  if (locale === "en-GB") {
    timezone = "Europe/London";
  } else if (locale === "fr") {
    timezone = "Europe/Paris";
  } else if (locale === "en-US") {
    timezone = "America/New_York";
  }

  const date = new Date(dateString);

  const formattedDate = date.toLocaleString(locale, {
    timeZone: timezone,
    hour12: locale === "en-US" ? true : false,
    timeStyle: "short",
  });
  return formattedDate;
};

export const formatAstro = (timeString: string, locale: string) => {
  if (locale === "en-US") {
    return timeString.slice(1);
  } else {
    if (timeString.endsWith("PM")) {
      return `${parseInt(timeString) + 12}${timeString.substr(2, 3)}`;
    } else {
      return `${timeString.substr(0, 5)}`;
    }
  }
};
