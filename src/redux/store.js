import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import dashboardReducer from "./features/dashboard";
import actionReducer from "./features/action";
import authReducer from "./features/auth";
import templateReducer from "./features/templates";
import userReducer from "./features/user";
import qrReducer from "./features/qrcodes";
import loader from "./features/loaders";
import blogs from "./features/blogs";
import contact from "./features/contact";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  action: actionReducer,
  auth: authReducer,
  template: templateReducer,
  user: userReducer,
  qr: qrReducer,
  loader: loader,
  blogs: blogs,
  contact: contact,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "dashboard",
    "contact",
    "blogs",
    "loader",
    "action",
    "auth",
    "template",
    "user",
    "qr",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
