import { configureStore } from "@reduxjs/toolkit";
import globaleStateSlice from "./slices/globaleStateSlice";

export default configureStore({
  reducer: {
    globalState: globaleStateSlice,
  },
});
