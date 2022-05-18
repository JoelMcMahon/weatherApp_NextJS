import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IToolTipContext,
  IToolTipContextProver,
  step,
} from "../interfaces/interfaces";
import { getForecast, getSteps } from "../services/services";

const toolTipContext = createContext<IToolTipContext>({
  enabled: true,
  setEnabled: () => {},
  onExit: () => {},
  activeSteps: [],
  setActiveSteps: () => {},
});

export const useToolTipContext = () => useContext(toolTipContext);

const ToolTipContextProvider: React.FC<IToolTipContextProver> = ({
  children,
}) => {
  const [enabled, setEnabled] = useState(true);
  const [activeSteps, setActiveSteps] = useState<any>([
    {
      element: "#tutorialBtn",
      title: "",
      intro: "",
      tooltipClass: "",
      highlightClass: "",
      nextLabel: "",
    },
  ]);

  useEffect(() => {
    getSteps("tutorial/en/firstSteps.json").then((response) => {
      setActiveSteps(Object.values(response));
    });
  }, []);

  console.log(activeSteps);

  const onExit = () => {
    setEnabled(false);
  };

  return (
    <toolTipContext.Provider
      value={{ enabled, setEnabled, onExit, activeSteps, setActiveSteps }}
    >
      {children}
    </toolTipContext.Provider>
  );
};

export default ToolTipContextProvider;
