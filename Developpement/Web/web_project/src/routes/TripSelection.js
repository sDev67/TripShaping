import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CardActionArea,
  Card,
  Grid,
  Stack,
  CardContent,
  Dialog,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import UserRequests from "../requests/UserRequests";
import Loading from "./../utils/Loading";
import { useAuth } from "../Authentication/auth";
import TripCard from "../components/TripCard";

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

const TripSelection = () => {
  let { user } = useAuth();

  let id = parseInt(user.id);

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: members,
  } = useQuery(["getMembers", user.id], () => UserRequests.getMembers(id));

  const classes = useStyles();

  const navigate = useNavigate();

  const [tripFormOpen, setTripFormOpen] = useState(false);

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
              TripShaping
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
          <Stack direction="column" justifyContent="flex-start" width="90%">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop={8}
            >
              <Typography color="primary" variant="h2" textAlign="center">
                Mes voyages
              </Typography>
              <Stack direction="row" spacing={5} alignItems="center">
                <Button
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => setTripFormOpen(true)}
                >
                  Créer un nouveau voyage
                </Button>
                <Button
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/discover"}
                >
                  Explorer des voyages
                </Button>
              </Stack>
            </Stack>

            <Grid marginTop={0} container spacing={10}>
              {isLoadingT ? (
                <Loading />
              ) : isErrorT ? (
                <p style={{ color: "red" }}>{errorT.message}</p>
              ) : (
                members.map((member, index) => (
                  <Grid key={index} item xs={4}>
                    <TripCard travelId={member.TravelId} />
                  </Grid>
                ))
              )}
            </Grid>
          </Stack>
        </Stack>
      </main>
      <Dialog open={tripFormOpen} onClose={() => setTripFormOpen(false)}>
        <TripForm setTripFormOpen={setTripFormOpen}></TripForm>
      </Dialog>
    </>
  );
};

export default TripSelection;
