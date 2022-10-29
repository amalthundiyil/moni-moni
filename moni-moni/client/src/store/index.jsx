import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type == "auth/userLogout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
