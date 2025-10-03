import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

const sortOptions = [
    {value:'name',label: 'Alphabetical'},
    {value:'priceDesc',label: 'Price: High to low'},
    {value:'price',label: 'Price: Low to high'}
]

type Props = {
    filterData: {
        brands: string[],
        types: string[]
    }
}

export default function Filters({filterData: data}: Props) {
    const dispatch = useAppDispatch();
    const { orderBy, types, brands } = useAppSelector(state=>state.catalog);

  return (
    <Box display='flex' flexDirection='column' gap={3}>
        <Paper>
            <Search></Search>
        </Paper>
        <Paper sx={{p:3}}>
            <RadioButtonGroup selectedValue={orderBy} options={sortOptions} onChange={e=>dispatch(setOrderBy(e.target.value))}></RadioButtonGroup>
        </Paper>
        <Paper sx={{p:3}}>
            <CheckboxButtons items = {data.brands} onChange={(items: string[]) => dispatch(setBrands(items))} checked={brands}></CheckboxButtons>
        </Paper>
        <Paper sx={{p:3}}>
            <CheckboxButtons items = {data.types} onChange={(items: string[]) => dispatch(setTypes(items))} checked={types}></CheckboxButtons>
        </Paper>
        <Button onClick={()=>{
            dispatch(resetParams());
            window.scrollTo({top:0, behavior:'smooth'})
        }}>Reset Filters
        </Button>
    </Box>
  )
}