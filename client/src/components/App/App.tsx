import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import { routes, RouteType } from "../../routes";
import Nav from "../Nav";

import "./App.css";

const App = (props: any) => (
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

export default App;
