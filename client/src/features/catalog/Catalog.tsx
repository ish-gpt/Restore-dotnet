import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList"
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const productParams = useAppSelector(state=>state.catalog);
    const { data, isLoading } = useFetchProductsQuery(productParams);
    const {data: filterData, isLoading: filterLoading} = useFetchFiltersQuery();

    const dispatch =  useAppDispatch();

    if(!data || isLoading || !filterData || filterLoading) return <h3>Loading...</h3>
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filterData={filterData}></Filters>
      </Grid2>
      <Grid2 size={9}>
        {
          data.items && data.items.length >0 ? (
            <>
            <ProductList products={data.items}></ProductList>
            <AppPagination metaData={data.pagination} onPageChange={(page) => {
              dispatch(setPageNumber(page));
              window.scrollTo({top:0, behavior:'smooth'});
            }}></AppPagination>  
            </>) : (
              <>
              <Typography variant="h5">There are no Items to Displa</Typography>
              </>
            )
        }
      </Grid2>
    </Grid2>
  )
}