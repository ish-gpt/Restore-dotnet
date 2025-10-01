import { configureStore } from "@reduxjs/toolkit";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { mode } from "../layout/modeSlice";
import { basketApi } from "../../features/basket/basketApi";

export const store = configureStore({
    reducer:{
        [catalogApi.reducerPath]: catalogApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        ui: uiSlice.reducer,
        mode: mode.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        catalogApi.middleware,
        basketApi.middleware
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()