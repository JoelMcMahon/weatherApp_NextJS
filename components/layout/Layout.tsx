import React, { ReactNode } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import DataTable from "./DataTable";
const JoyrideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
import { TooltipRenderProps } from "react-joyride";
import { useToolTipContext } from "../../context/ToolTipContextProvider";
import CloseIcon from "@mui/icons-material/Close";

type ComponentProps = {
  children: ReactNode;
};

const Layout: NextPage<ComponentProps> = ({ children }) => {
  const { activeSteps, run, setRun, setActiveSteps } = useToolTipContext();

  const Tooltip: React.FC<TooltipRenderProps> = ({
    continuous,
    index,
    step,
    skipProps,
    backProps,
    closeProps,
    primaryProps,
    tooltipProps,
    size,
    isLastStep,
  }) => (
    <div id="toolTip" {...tooltipProps}>
      <div id="close" {...skipProps}>
        <CloseIcon></CloseIcon>
      </div>
      <div id="toolTipBody">
        <div id="toolTipTitle">{step.title && <h3>{step.title}</h3>}</div>
        <div id="toolTipContent">{step.content}</div>
      </div>
      <div id="toolTipButtonContainer">
        {index === 0 && (
          <button className="toolTipButton" {...skipProps}>
            Skip Tutorial
          </button>
        )}
        {index > 0 && (
          <button id="back" className="toolTipButton" {...backProps}>
            Back
          </button>
        )}
        {!isLastStep ? (
          <button id="next" className="toolTipButton" {...primaryProps}>
            Next {(index += 1)}/{size}
          </button>
        ) : (
          <button id="end" className="toolTipButton" {...primaryProps}>
            End Tutorial {(index += 1)}/{size}
          </button>
        )}
      </div>
    </div>
  );

  const handleJoyrideCallback = (data: any) => {
    if (data.action === "reset") {
      setRun(false);
    }
  };

  return (
    <>
      <JoyrideNoSSR
        showProgress
        spotlightClicks
        debug
        disableOverlayClose={true}
        disableOverlay={false}
        showSkipButton
        hideCloseButton
        callback={handleJoyrideCallback}
        run={run}
        styles={{
          options: {
            arrowColor: "#064663",
          },
        }}
        steps={activeSteps}
        tooltipComponent={Tooltip}
      />
      <DataTable></DataTable>
      <main>{children}</main>
    </>
  );
};

export default Layout;
