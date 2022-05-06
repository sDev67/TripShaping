import { Button, Stack } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link, Outlet, useParams } from "react-router-dom";
const Login = () => 
{
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        mail: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      

    return(
    <>
        <Stack alignItems='center'>
            <Typography
            color="primary"
            variant="h2"
            textAlign="center"
            marginTop={4}
            >
            Connexion
            </Typography>

            <Stack marginTop='5vh' border='solid' borderRadius='5%' color='green' width='40%' heigth='100%' alignItems='center' justifyContent='space-around'>
                <FormControl sx={{ m: 1, width: '25ch', marginTop:'10vh', width:'80%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mail address</InputLabel>
                    <OutlinedInput
                        error={false}            
                        type={'email'}
                        value={values.mail}
                        onChange={handleChange('mail')}
                        label="Mail Address"
                    />
                </FormControl>
                <Typography style={{}} color='error'>Email non répertoriée ou incorrect.</Typography>
                <FormControl sx={{ m: 1, width: '25ch', width:'80%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Typography style={{ marginBottom:'10vh'}} color='error'>Mot de passe incorrect.</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size='large'
                  startIcon={<AccountCircleRoundedIcon />} 
                >

                  Se connecter

              </Button>
              <Typography variant="body" 
                value={"/signup"}
                component={Link}
                to={"/signup"}
                style={{marginBottom:'10vh'}}>
                
               Pas de compte ? Inscrivez-vous ici.</Typography>
       
            </Stack>
            
           
        </Stack>
            
       
    </>)
}

export default Login;