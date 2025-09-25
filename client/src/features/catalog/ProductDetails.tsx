import { useParams } from "react-router-dom"
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
    const {id} = useParams();

    const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id : 0);

     const tableData = [
        { label: 'Name', value: product?.name },
        { label: 'Description', value: product?.description },
        { label: 'Type', value: product?.type },
        { label: 'Brand', value: product?.brand },
        { label: 'Quantity in Stock', value: product?.quantityInStock.toString() }
    ]

      if(!product || isLoading) return <h3>Loading...</h3>
  return (
    <Grid2 container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
        <Grid2 size={6}>
            <img src={product?.pictureUrl} alt={product?.name} style={{width:'100%'}} />
        </Grid2>
        <Grid2 size={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb:2}}></Divider>
            <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {
                            tableData.map(({label, value}) => (
                                <TableRow key={label}>
                                    <TableCell sx={{fontWeight:'bold'}}>{label}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))
                        }
                     </TableBody>   
                </Table>
            </TableContainer>
            <Grid2 spacing={2} marginTop={3} container>
                <Grid2 size={6}>  
                    <TextField label="Quantity" variant="outlined" type="number" fullWidth defaultValue={1}></TextField>
                </Grid2>
                <Grid2 size={6}>
                    <Button fullWidth sx={{height:'55px'}} color='primary' size='large' variant='contained'>Add to Cart</Button>
                </Grid2>
            </Grid2>
        </Grid2>
        
    </Grid2>
  )
}