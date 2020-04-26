import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reducers from "./reducers";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: [""],
// };

// export type RootState = ReturnType<typeof reducers>;
// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  reducers /* preloadedState, */,
  composeWithDevTools(applyMiddleware(thunk))
);

// export const persistor = persistStore(store);
