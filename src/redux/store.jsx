import { configureStore } from "@reduxjs/toolkit";
import CoreMiningReducer from "./CoreMining";
export default configureStore({
  reducer: {
    CoreMining: CoreMiningReducer,
  },
});
