import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useWindowSize } from "web-api-hooks"; TODO: FIX TYPE ERROR
import { Box } from "@chakra-ui/core";
import { useLimitByWindowWidth } from "../../hooks/useLimitByWindowWidth";
import { routes, RouteType } from "../../routes";
import Nav from "../Nav";

import "./App.css";

const App = (props: any) => {
  // Set per page limit, based on window width
  useLimitByWindowWidth();

  return (
    <Router>
      <Box className="App" bg="black" height="100%" minHeight="100vh">
        <Nav />
        <Switch>
          {routes.map((route: RouteType, index: number) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
