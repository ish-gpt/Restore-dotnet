import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../../app/lib/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi"
import { useForm } from "react-hook-form";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [registerUser] = useRegisterMutation();
    const {register,handleSubmit,formState:{errors, isValid, isLoading}, setError} = useForm<RegisterSchema>({
            mode:'onTouched',
            resolver:zodResolver(registerSchema)
        });

    const onSubmit = async (data: RegisterSchema) => {
        try{
            await registerUser(data).unwrap();
        } catch(error) {
            console.log(error);
            const apiError = error as {message:string};
            if(apiError.message && typeof apiError.message === 'string') {
                const errArray = apiError.message.split(',');

                errArray.forEach(e => {
                    if(e.includes('Password')){
                        setError('password',{message: e});
                    } else if(e.includes('Email')) {
                        setError('email',{message: e});
                    }
                })
            }
        }
    }    
  return (
    <Container component={Paper} maxWidth='sm' sx={{borderRadius:3}}>
        <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
            <LockOutlined sx={{mt:3, color:'secondary.main', fontSize:40}}>
            </LockOutlined>
            <Typography variant="h5">
                    Register
                </Typography>
                <Box onSubmit={handleSubmit(onSubmit)}
                component='form' width='100%' display='flex' flexDirection='column' gap={3}
                my={3}
                 >
                    <TextField fullWidth label='Email' autoFocus {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    ></TextField>
                    <TextField fullWidth label='Password' type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    ></TextField>
                    <Button disabled={!isValid || isLoading} variant="contained" type="submit">Register</Button>
                    <Typography sx={{textAlign:'center'}}>
                        Already have an account?
                        <Typography sx={{ml:2}} component={Link} to='/login' color="primary">
                            Sign in here
                        </Typography>
                    </Typography>
                </Box>
        </Box>
    </Container>
  )
}