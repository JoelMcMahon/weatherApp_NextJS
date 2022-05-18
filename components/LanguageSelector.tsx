import React from "react";
import { useLanguageContext } from "../context/LanguageContextProvider";

import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

const LanguageSelector: React.FC = () => {
  const { locale, handleChangeLanguage } = useLanguageContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginRight: { xs: "0rem", lg: "1rem" },
      }}
    >
      <label htmlFor="languageSelector" id="language">
        <FormattedMessage
          id="app.languageSelector.language"
          defaultMessage="Language"
        />
      </label>
      <select id="menu" value={locale} onChange={handleChangeLanguage}>
        <option className="options" value="en-GB">
          EN
        </option>
        <option className="options" value="fr">
          FR
        </option>
        <option className="options" value="en-US">
          US
        </option>
      </select>
    </Box>
  );
};

export default LanguageSelector;
