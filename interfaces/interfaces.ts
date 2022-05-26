import React from "react";

export type city = {
  name: string;
  forecast: any[];
};

export interface ICity {
  cities: city[];
  setCities: React.Dispatch<React.SetStateAction<city[]>>;
}

export interface ICityContext {
  city: city;
  setCity: React.Dispatch<React.SetStateAction<city>>;
}

export interface IToolTipContext {
  run: boolean;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  activeSteps: step[];
  setActiveSteps: React.Dispatch<React.SetStateAction<step[]>>;
}

export type step = {
  target: string;
  content: string;
};

export interface IStepsContext {
  activeSteps: step[];
  setActiveSteps: React.Dispatch<React.SetStateAction<step[]>>;
}

export interface IFavouritesContext {
  favourites: ICity["cities"];
  setFavourites: React.Dispatch<React.SetStateAction<ICity["cities"]>>;
  showFavourites: boolean;
  setShowFavourites: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILangaugeContext {
  children?: React.ReactNode;
}

export interface ICityContextProvider {
  children?: React.ReactNode;
}

export interface IToolTipContextProver {
  children?: React.ReactNode;
}

export interface IFavouritesContextProvider {
  children?: React.ReactNode;
}
