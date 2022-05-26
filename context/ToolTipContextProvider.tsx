import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IToolTipContext,
  IToolTipContextProver,
  step,
} from "../interfaces/interfaces";
import { getSteps } from "../services/services";

const toolTipContext = createContext<IToolTipContext>({
  run: true,
  setRun: () => {},
  activeSteps: [],
  setActiveSteps: () => {},
});

export const useToolTipContext = () => useContext(toolTipContext);

const ToolTipContextProvider: React.FC<IToolTipContextProver> = ({
  children,
}) => {
  const [run, setRun] = useState<boolean>(false);
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
    getSteps("tutorial/en/steps1.json")
      .then((response) => {
        setActiveSteps(Object.values(response));
      })
      .then(() => {
        setRun(true);
      });
  }, []);

  console.log(activeSteps);

  return (
    <toolTipContext.Provider
      value={{
        run,
        setRun,
        activeSteps,
        setActiveSteps,
      }}
    >
      {children}
    </toolTipContext.Provider>
  );
};

export default ToolTipContextProvider;
