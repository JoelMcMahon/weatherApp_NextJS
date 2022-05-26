import { Button } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useToolTipContext } from "../context/ToolTipContextProvider";
import { getSteps } from "../services/services";

const Tutorial = () => {
  const { setActiveSteps, setRun } = useToolTipContext();

  const handleRelaunchTutorial = () => {
    getSteps("tutorial/en/steps1.json")
      .then((response) => {
        setActiveSteps(Object.values(response));
      })
      .then(() => {
        setRun(true);
      });
  };

  return (
    <div>
      <Button id="tutorialBtn" type="submit" onClick={handleRelaunchTutorial}>
        <FormattedMessage id="tutorial" defaultMessage="Tutorial" />
      </Button>
    </div>
  );
};

export default Tutorial;
