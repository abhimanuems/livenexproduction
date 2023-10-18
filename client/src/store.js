import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userDetails from "./slices/userDetails.js";
import adminAuthSlice from "./slices/adminAuthSlice";
import { apiSlice } from "./slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    userDetails: userDetails,
    adminAuth: adminAuthSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
