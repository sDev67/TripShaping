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
const Signup = () => 
{
    const [values, setValues] = React.useState({
        amount: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmedPassword: '',
        mail: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        showErrorPassword:false,
        showPasswordsError:false,
        showEmailError:false,
        showErrorFirstname:false,
        showErrorLastname:false
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

      const handleClickSignup = () =>
      {
        if(values.firstname === undefined || values.firstname === null || values.firstname === '')
        {
          setValues({...values, showErrorFirstname: true});
        }
        else{
          setValues({...values, showErrorFirstname: false});
        }

        if(values.lastname === undefined || values.lastname === null ||values.lastname === '')
        {
          setValues({...values, showErrorLastname: true});
        }
        else{
          setValues({...values, showErrorLastname: false});
        }

        if(values.password === undefined || values.password === null || values.password === '')
        {
          setValues({...values, showErrorPassword: true});
        }
        else{
          setValues({...values, showErrorFirstname: false});
        }

        if(values.confirmedPassword !== values.password){
          setValues({...values, showPasswordsError: true});
        }
        else{
          setValues({...values, showPasswordsError: false});
        }

        var emailvalue=String(values.email);
        var validRegex = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";

        if(emailvalue.match(validRegex)){

          setValues({...values, showEmailError: true});
        }
        else{
          setValues({...values, showEmailError: false});
        }
      }

    return(
    <>
        <Stack alignItems='center'>
            <Typography
            color="primary"
            variant="h2"
            textAlign="center"
            marginTop={4}
            >
            Inscription
            </Typography>

            <Stack marginTop='5vh' border='solid' borderRadius='5%' color='green' width='40%' heigth='100%' alignItems='center' justifyContent='space-around'>
              <FormControl sx={{ m: 1, width: '25ch', marginTop:'5vh', width:'80%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Nom</InputLabel>
                      <OutlinedInput
                          error={false}            
                          type={'text'}
                          value={values.lastname}
                          onChange={handleChange('lastname')}
                          label="Nom"
                      />
                </FormControl>
                {values.showErrorLastname ?<Typography style={{}} color='error'>Ce champ ne peut pas être vide.</Typography>:""}
                <FormControl sx={{ m: 1, width: '25ch', width:'80%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Prénom</InputLabel>
                      <OutlinedInput
                          error={false}            
                          type={'text'}
                          value={values.firstname}
                          onChange={handleChange('firstname')}
                          label="Prénom"
                      />
                  </FormControl>
                { values.showErrorFirstname? <Typography  style={{}} color='error'>Ce champ ne peut pas être vide.</Typography>:""}
                <FormControl sx={{ m: 1, width: '25ch', width:'80%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mail address</InputLabel>
                    <OutlinedInput
                        error={false}            
                        type={'email'}
                        value={values.mail}
                        onChange={handleChange('mail')}
                        label="Mail Address"
                    />
                </FormControl>
                {values.showEmailError?<Typography  style={{}} color='error'>Email non valide. Veuillez respecter ce format : xxx@xxx.yy</Typography>:""}
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
               {values.showErrorPassword ?
                <Typography   style={{}} color='error'>Ce champ ne peut pas être vide.</Typography> :""}
                <FormControl sx={{ m: 1, width: '25ch', width:'80%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirmez le mot de passe</InputLabel>
                    <OutlinedInput
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmedPassword}
                        onChange={handleChange('confirmedPassword')}
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
                {values.showPasswordsError ?
                 <Typography style={{ marginBottom:'5vh'}} color='error'>Les deux mots de passes ne correspondent pas.</Typography> : ""}
                <Button
                  variant="contained"
                  color="primary"
                  size='large'
                  startIcon={<AccountCircleRoundedIcon />}   
                  onClick={() => handleClickSignup()} >

                  S'inscrire

              </Button>
              <Typography variant="body" 
                value={"/login"}
                component={Link}
                to={"/login"}
                style={{marginBottom:'10vh'}}>
                
                Déjà inscrit ? Connectez-vous ici.</Typography>
       
            </Stack>
            
           
        </Stack>
            
       
    </>)
}

export default Signup;