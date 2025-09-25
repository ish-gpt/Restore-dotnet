import ProductList from "./ProductList"
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {
    const { data, isLoading } = useFetchProductsQuery();

    if(!data || isLoading) return <h3>Loading...</h3>
  return (
    <>
    <ProductList products={data}></ProductList>
    </>
  )
}