import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Card,
  Stack,
  CardContent,
  Snackbar,
  Button,
  Typography,
  Alert,
  CardMedia,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Container,
  Grid,
  Rating,
  CardHeader,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import Loading from "../utils/Loading";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Exploration = () => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travels,
  } = useQuery(["getTravels"], () => TravelRequests.getPublishedTravel());

  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar style={{ height: "6.85%" }}>
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              color="inherit"
              variant="h3"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
              width="5%"
            >
              Atlas
            </Typography>
            <Stack width="80%"></Stack>

            <Stack direction="row" width="15%" justifyContent="flex-end">
              <Button color="inherit" to={"/signin"} component={Link}>
                Se connecter
              </Button>
              <Button color="inherit" to={"/signup"} component={Link}>
                S'inscrire
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <main className={classes.content}>
        <div style={{ height: "6.85%" }}></div>
        <Stack
          direction="column"
          alignItems="center"
          style={{
            // backgroundImage: `url(${require("../assets/balloons-flying.jpg")})`,
            backgroundSize: "cover",
            height: "93.15%",
          }}
        >
          <Stack direction="row" marginTop={8}>
            <Typography color="primary" variant="h2">
              Découvrez tous les voyages partagés par les utilisateurs !
            </Typography>
          </Stack>
          <Stack direction="column" justifyContent="flex-start" width="90%">
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              width="40%"
              marginTop={10}
              marginBottom={5}
            >
              <TextField
                fullWidth
                label="Voyage"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                style={{ paddingLeft: 32, paddingRight: 32 }}
                variant="contained"
                color="primary"
              >
                Rechercher
              </Button>
            </Stack>
            <Grid container spacing={10}>
              {isLoadingT ? (
                <Loading />
              ) : isErrorT ? (
                <p style={{ color: "red" }}>{errorT.message}</p>
              ) : travels.length == 0 ? (
                <>
                  <Typography
                    color="error"
                    variant="h3"
                    textAlign="center"
                    paddingTop={4}
                  >
                    Aucun voyage n'est publié actuellement
                  </Typography>
                </>
              ) : (
                travels.map((travel, index) => (
                  <Grid key={index} item xs={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="194"
                        image={require("../assets/etapes.png")}
                      />
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Typography variant="h4" textAlign="center">
                            {travel.name}
                            {travel.toPublish}
                          </Typography>
                          <Button
                            style={{ paddingLeft: 32, paddingRight: 32 }}
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen(true)}
                          >
                            Copier le voyage
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
        </Stack>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          variant="filled"
          color="primary"
          sx={{ width: "100%" }}
        >
          Voyage copié!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Exploration;
