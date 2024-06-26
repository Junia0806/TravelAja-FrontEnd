import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./reducers/authReducers";
import flightReducers from "./reducers/flightReducers";
import bookingReducers from "./reducers/bookingReducers";
import notifReducers from "./reducers/notifReducers";
import promoReducers from "./reducers/promoReducers";

const rootReducers = combineReducers({
  auth: authReducers,
  flights: flightReducers,
  booking: bookingReducers,
  notif: notifReducers,
  promo: promoReducers,
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
