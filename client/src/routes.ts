import Home from "./components/Home";
import Program from "./components/Program";
import React from "react";

export interface RouteType {
  path: string;
  component: React.FunctionComponent;
  exact?: boolean;
}

export const routes: RouteType[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/program/:slug",
    component: Program,
  },
];
