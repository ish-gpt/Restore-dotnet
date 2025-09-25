import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customeBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api/'
})

const sleep = ()=>(new Promise((resolve) => setTimeout(resolve, 2000)));

export const baseQueryWithErrorHandling = async (args:FetchArgs | string, api: BaseQueryApi, extraOptions:object) => {
    api.dispatch(startLoading())
    await sleep();
    const result = await customeBaseQuery(args, api, extraOptions);
    if(result.error) {
         const {status, data} = result.error;
         console.log('error status', status);
         console.log('error data', data);
    }
    api.dispatch(stopLoading());

    return result;
}
