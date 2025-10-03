import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
    const {searchTerm} = useAppSelector(state=>state.catalog);
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(searchTerm);

    useEffect(()=>{
        setTerm(searchTerm)
    },[searchTerm]);

    const debouncedSerach = debounce(event => {
        dispatch(setSearchTerm(event.target.value))
    }, 500);

    return (
    <TextField label='Seach products' variant="outlined" fullWidth type="search" value={term}
    onChange={(e)=>{
        setTerm(e.target.value);
        debouncedSerach(e)
    }}
    >
    </TextField>
  )
}