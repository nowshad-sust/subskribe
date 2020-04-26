import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers";

// const persistConfig = {
//   key: "root",
//   // storage,
//   whitelist: ["cartItems"],
// };

// export type RootState = ReturnType<typeof reducers>;
// const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

export const store = createStore(
  reducers /* preloadedState, */,
  composeWithDevTools()
);

// export const persistor = persistStore(store);
