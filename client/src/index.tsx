import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { CSSReset, ThemeProvider, ColorModeProvider } from "@chakra-ui/core";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import themeConfig from "./config/theme";
import { store } from "./store";

import "./index.css";

render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
      <ThemeProvider theme={themeConfig}>
        <CSSReset />
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
