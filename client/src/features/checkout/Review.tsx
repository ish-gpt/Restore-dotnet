import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi"
import { currencyFormat } from "../../app/lib/util";
import type { ConfirmationToken } from "@stripe/stripe-js";

type Props = {
    confirmToken: ConfirmationToken | null
}

export default function Review({confirmToken}: Props) {
    const {data:basket} = useFetchBasketQuery();
    const addressString = () => {
        if(!confirmToken?.shipping) return '';
        const {name, address} = confirmToken.shipping
        return `${name},${address?.line1}, ${address?.line2}, ${address?.city}, ${address?.postal_code}, ${address?.country}`
    }

    const paymentString = () => {
        if(!confirmToken?.payment_method_preview) return '';
        const {card} = confirmToken.payment_method_preview
        return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
    }

  return (
    <div>
        <Box mt={4} width='100%'>
            <Typography variant="h6" fontWeight='bold'>Billing and delivery information</Typography>
            <dl>
                <Typography component='dt' fontWeight='medium'>
                    Address Details
                </Typography>
                <Typography component='dd' mt={1} color='textSecondary'>
                    {addressString()}
                </Typography>
                <Typography component='dt' fontWeight='medium'>
                    Payment Details
                </Typography>
                <Typography component='dd' mt={1} color='textSecondary'>
                    {paymentString()}
                </Typography>
            </dl>
        </Box>
        <Box mt={6} mx='auto'>
            <Divider></Divider>
            <TableContainer>
                <Table>
                    <TableBody>
                        {
                            basket?.items.map((item)=>(
                                <TableRow key={item.productId} sx={{borderBottom: '1px solid rgba(224,224,224,1)'}}>
                                    <TableCell sx={{py:4}}>
                                        <Box display='flex' gap={3} alignItems='center'>
                                            <img src={item.pictureUrl} alt={item.name} style={{width:40, height:40}}></img>
                                            <Typography>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center' sx={{p:4}}>
                                        x {item.quantity}
                                    </TableCell>
                                    <TableCell align='center' sx={{p:4}}>
                                        {currencyFormat(item.price)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </div>
  )
}