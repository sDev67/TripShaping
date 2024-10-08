import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Card,
  CardContent,
  Popover,
  Grid,
  Stack,
  Avatar,
  Dialog,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  CardHeader,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";
import { useQuery } from "react-query";
import UserRequests from "../requests/UserRequests";
import Loading from "./../utils/Loading";
import { useAuth } from "../Authentication/auth";
import TripCard from "../components/TripCard";
import ProfileBubble from "../components/ProfileBubble";
import CustomSnackbar from "../utils/CustomSnackbar";
import { backgroundColorMain } from "../theme/backgroundColor";

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

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

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
              width="8%"
            >
              <img
                src="https://see.fontimg.com/api/renderfont4/PxlZ/eyJyIjoiZnMiLCJoIjo4NywidyI6MTAwMCwiZnMiOjg3LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/VHJpcFNoYXBpbmc/quick-kiss-personal-use.png"
                alt="Trip Shaping"
              />
            </Typography>
            <Stack width="80%"></Stack>
            <Stack
              direction="row"
              width="15%"
              justifyContent="flex-end"
            ></Stack>
            <ProfileBubble></ProfileBubble>
          </Toolbar>
        </AppBar>
      </Box>
      <main
        className={classes.content}
        style={{
          background: backgroundColorMain,
        }}
      >
        <div style={{ height: "6.85%" }}></div>
        <Stack
          direction="column"
          height="93.15%"
          width="90%"
          marginLeft="5%"
          justifyContent="flex-start"
        >
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

          <Grid
            marginTop={0}
            paddingX={2}
            paddingBottom={2}
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={5}
            style={{
              overflowY: "scroll",
            }}
          >
            {isLoadingT ? (
              <Loading />
            ) : isErrorT ? (
              <p style={{ color: "red" }}>{errorT.message}</p>
            ) : (
              members.map((member, index) => (
                <Grid key={index} item xs={4}>
                  <TripCard
                    travelId={member.TravelId}
                    user={user}
                    setOpen={setOpen}
                    setMessage={setMessage}
                    setColor={setColor}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Stack>
      </main>
      <Dialog open={tripFormOpen} onClose={() => setTripFormOpen(false)}>
        <TripForm
          setTripFormOpen={setTripFormOpen}
          setOpen={setOpen}
          setMessage={setMessage}
          setColor={setColor}
        ></TripForm>
      </Dialog>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        color={color}
      ></CustomSnackbar>
    </>
  );
};

export default TripSelection;
