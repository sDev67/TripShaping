import React, { useState } from 'react';
import { useAuth } from '../Authentication/auth';
import {Box, Typography, Stack,FormControl,IconButton,Input,FilledInput,TextField,FormHelperText,InputAdornment,InputLabel,OutlinedInput, Button} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link, Outlet, useParams } from "react-router-dom";

const Signin = () => {
	const { signin } = useAuth();

	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

	const [message, setMessage] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		signin({ username, password })
			.catch(err => {
				setUsername('');
				setPassword('');
				setMessage(err.message);
			});
	};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	return (
		<>
       <Stack alignItems='center'>
            <Typography color="primary" variant="h2" textAlign="center"marginTop={4}>
            Connexion
            </Typography>

            <Stack marginTop='5vh' border='solid' borderRadius='5%' color='green' width='40%' heigth='100%' alignItems='center' justifyContent='space-around'>
                <FormControl sx={{ m: 1, width: '25ch', marginTop:'10vh', width:'80%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Nom d'utilisateur</InputLabel>
                    <OutlinedInput
                        error={false}            
                        type={'text'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Nom d'utilisateur"
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch', width:'80%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Mot de passe"
                    />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  size='large'
                  startIcon={<AccountCircleRoundedIcon />} 
                  onClick={(e) => handleSubmit(e)}>

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

			
			{message && <p style={{ color: 'red' }}>{message}</p>}
		</>
	);
};

export default Signin;
