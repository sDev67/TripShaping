import React, { useState } from "react";
import { useAuth } from "../Authentication/auth";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  IconButton,
  Grid,
  Avatar,
  Alert,
  Paper,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, Outlet, useParams } from "react-router-dom";
import AlertError from "../utils/AlertError";

const theme = createTheme();

const Signin = () => {
  const { signin } = useAuth();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ username, password }).catch((err) => {
      setUsername("");
      setPassword("");
      setMessage(err.message);
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://www.thispersondoesnotexist.com/image)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Connexion</Typography>
            <Stack marginTop="10%" direction="column" width="100%" spacing={5}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Nom d'utilisateur
                </InputLabel>
                <OutlinedInput
                  error={false}
                  type={"text"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Nom d'utilisateur"
                />
              </FormControl>

              <FormControl variant="outlined" required fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Mot de passe
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
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
            </Stack>
            <Stack direction="column" marginY={5}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<AccountCircleRoundedIcon />}
                sx={{ mb: 1 }}
                onClick={(e) => handleSubmit(e)}
              >
                CONNEXION
              </Button>

              <Typography
                textAlign="center"
                variant="body2"
                value={"/signup"}
                component={Link}
                to={"/signup"}
              >
                Pas de compte ? Inscrivez-vous ici.
              </Typography>
            </Stack>
            {message && <AlertError message={message}></AlertError>}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;
