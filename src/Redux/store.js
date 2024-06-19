import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./reducers/authReducers";
import flightReducers from "./reducers/flightReducers";
import bookingReducers from "./reducers/bookingReducers";

//Reducernya disini
const rootReducers = combineReducers({
  auth: authReducers,
  flights: flightReducers,
 booking: bookingReducers
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
