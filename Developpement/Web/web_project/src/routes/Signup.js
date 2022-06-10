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
import palette from "./../theme/palette";
import image from "../assets/rainbow.png";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

const Signup = () => {
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ username, password }).catch((err) => {
      setUsername("");
      setPassword("");
      setPasswordCheck("");
      setMessage(err.message);
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formValid = username && password && password === passwordCheck;

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
            backgroundImage: `url(${image})`,
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Button to="/" component={Link}>
                <ArrowCircleLeftRoundedIcon
                  color="error"
                  size="large"
                  marginRight={1}
                />
                <Typography variant="button" color="error">
                  Retour
                </Typography>
              </Button>
              <Stack alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Inscription</Typography>
              </Stack>
              <Button style={{ visibility: "hidden" }}>
                <ArrowCircleLeftRoundedIcon
                  color="error"
                  size="large"
                  marginRight={1}
                />
                <Typography variant="button" color="error">
                  Retour
                </Typography>
              </Button>
            </Stack>
            <Stack marginTop="10%" direction="column" width="100%" spacing={5}>
              <FormControl fullWidth required variant="outlined">
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

              <FormControl fullWidth required variant="outlined">
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
              <FormControl fullWidth required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirmez le mot de passe
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
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
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AccountCircleRoundedIcon />}
                onClick={(e) => handleSubmit(e)}
                sx={{ mb: 1 }}
                disabled={formValid ? false : true}
              >
                S'INSCRIRE
              </Button>
              <Typography
                variant="body2"
                value={"/signin"}
                component={Link}
                to={"/signin"}
                style={{ marginBottom: "10vh" }}
              >
                Déjà inscrit ? Connectez-vous ici.
              </Typography>
            </Stack>
            {message && (
              <AlertError message={message} severity={"error"}></AlertError>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
