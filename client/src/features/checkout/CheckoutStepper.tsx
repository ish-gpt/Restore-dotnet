import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../acccount/accountApi";
import type { Address } from "../../app/models/user";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../app/lib/hooks/useBasket";
import { currencyFormat } from "../../app/lib/util";
import { useNavigate } from "react-router-dom";

const steps = [
    'Address',
    'Payment',
    'Review'
]

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const {basket} = useBasket();
    const navigate = useNavigate();
    const {total, clearBasket} = useBasket();
    const stripe = useStripe();
    const [confirmToken,setConfirmationToken] = useState<ConfirmationToken | null>(null);
    const getStripeAddress = async () => {
        const addElement = elements?.getElement('address');
        if(!addElement) return null;
        const {value: {name, address}} = await addElement.getValue();
        if(name && address) return {...address,name};
        return null;
    }

    const handleNext = async () => {
        if(activeStep===0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if(address) await updateAddress(address);
        } 
        if(activeStep===1){
            if(!elements || !stripe) return;
            const result = await elements.submit();
            if(result.error) {
                alert(result.error.message)
                return;
            }
            const stripeResult = await stripe.createConfirmationToken({elements});
            if(stripeResult.error) {
                alert(stripeResult.error.message)
                return
            }
            setConfirmationToken(stripeResult.confirmationToken);
        }
        if(activeStep===2){
            await confirmPayment();
            return;
        }
        if(activeStep < 2) setActiveStep(step=>step+1);
    }

    const confirmPayment = async () =>{
        setSubmitting(true);
        try {
            if(!confirmToken || !basket?.clientSecret)
                throw new Error("Payment could not be processed");

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect:'if_required',
                confirmParams:{
                    confirmation_token: confirmToken.id
                }
            });
            if(paymentResult?.paymentIntent?.status === 'succeeded'){
                navigate('/checkout/success');
                clearBasket();
            } else if (paymentResult?.error) {
                throw new Error(paymentResult?.error.message)
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            if(error instanceof Error)
                console.error(error.message);
            setActiveStep(step=>step-1);
        } finally {
            setSubmitting(false);
        }
    }


    const handleBack = () =>{
        setActiveStep(step=>step-1);
    }

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setAddressComplete(event.complete);
    }

    const handlePaymemtChange = (event: StripePaymentElementChangeEvent) => {
        setPaymentComplete(event.complete);
    }

    const {data: {name,...restAddress}={} as Address,isLoading} = useFetchAddressQuery();
    const [updateAddress] = useUpdateUserAddressMutation();
    const [saveAddressChecked, setSavedAddressChecked] = useState(false);
    const elements = useElements();

    if(isLoading) return <Typography variant="h6">Loading Checkout...</Typography>;
  return (
    <Paper sx={{p:3, borderRadius:3}}>
        <Stepper activeStep={activeStep}>
            {
                steps.map((label, indx) => (
                    <Step key={indx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
        <Box sx={{mt:2}}>
            <Box sx={{display:activeStep===0 ? 'block' : 'none'}}> 
                <AddressElement options={{mode:'shipping',
                defaultValues:{
                    name: name,
                    address: restAddress
                }
                }}
                onChange={handleAddressChange}
                ></AddressElement>
                <FormControlLabel sx={{display:'flex', justifyContent:'end'}}
                control={<Checkbox checked={saveAddressChecked} onChange={e=>setSavedAddressChecked(e.target.checked)}></Checkbox>}
                label='Save as defaul address'
                ></FormControlLabel>
            </Box>
        </Box>
        <Box sx={{mt:2}}>
            <Box sx={{display:activeStep===1 ? 'block' : 'none'}}> 
                <PaymentElement onChange={handlePaymemtChange}
                options={{wallets:{applePay:'never',googlePay:'never'}}}
                ></PaymentElement>
            </Box>
        </Box>
        <Box sx={{mt:2}}>
            <Box sx={{display:activeStep===2 ? 'block' : 'none'}}> <Review confirmToken={confirmToken}></Review> </Box>
        </Box>
            <Box display='flex' paddingTop={2} justifyContent='space-between'>
                <Button onClick={handleBack} >Back</Button>
                <Button onClick={handleNext} loading={submitting}
                disabled={
                    (activeStep ===0&& !addressComplete) || (activeStep===1 && !paymentComplete) || submitting    
                }
                >{activeStep === steps.length-1 ? `Pay ${currencyFormat(total)}` : 'Next'}</Button>
            </Box>
    </Paper>
  )
}

