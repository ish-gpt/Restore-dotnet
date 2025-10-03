import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParam } from "../../app/models/productParams";
import { filteredParams } from "../../app/lib/util";
import type { Pagination } from "../../app/models/pagination";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        fetchProducts: builder.query<{items: Product[], pagination: Pagination} , ProductParam>({
            query: (productParams) =>{
                return {
                url: 'products',
                params: filteredParams(productParams)
            }
            },
            transformResponse:(items:Product[],meta) => {
                const paginationHeader = meta?.response?.headers.get('Pagination');
                const pagination = paginationHeader? JSON.parse(paginationHeader): null;
                return {items, pagination};
            }
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (id) => `products/${id}`
        }),
        fetchFilters: builder.query<{brands: string[], types: string[]}, void> ({
            query: () => 'products/filters'
        })
    })
})

export const { useFetchProductDetailsQuery, useFetchProductsQuery, useFetchFiltersQuery} = catalogApi;