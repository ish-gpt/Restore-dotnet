import { configureStore } from "@reduxjs/toolkit";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { mode } from "../layout/modeSlice";
import { basketApi } from "../../features/basket/basketApi";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { accountApi } from "../../features/acccount/accountApi";
import { checkoutApi } from "../../features/checkout/checkoutApi";

export const store = configureStore({
    reducer:{
        [catalogApi.reducerPath]: catalogApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,
        ui: uiSlice.reducer,
        mode: mode.reducer,
        catalog: catalogSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        catalogApi.middleware,
        basketApi.middleware,
        accountApi.middleware,
        checkoutApi.middleware
    )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()