import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppStyle from '../App.css'
import {
  TextField,
  Card,
  Stack,
  CardContent,
  Snackbar,
  Button,
  Typography,
  SpeedDial,
  CardMedia,
  SpeedDialAction,
  AppBar,
  Toolbar,
  Box,
  SpeedDialIcon,
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
import MemberRequests from "../requests/MemberRequests";
import Loading from "../utils/Loading";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../Authentication/auth";
import ProfileBubble from "../components/ProfileBubble";
import CustomSnackbar from "../utils/CustomSnackbar";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ExplorationTripCard from "../components/ExplorationTripCard";

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
  let { user, signout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  function handleClick() {
    setAnchorEl(divRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const openPopover = Boolean(anchorEl);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [filterTravel, setFilterTravel] = useState("");

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travels,
  } = useQuery(["getTravels"], () => TravelRequests.getPublishedTravel());

  const {
    isLoading: isLoadingL,
    isError: isErrorL,
    error: errorL,
    data: lastTravels,
  } = useQuery(["getLastTravels"], () => TravelRequests.getLastTenPublishedTravel());

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) => {
      queryClient.setQueriesData(["getMembers", user.id], (members) => [
        ...members,
        member,
      ]);
      setOpen(true);
    },
  });

  const handleCLickCopyTravel = (travel) => {
    copyTravel.mutate({ TravelId: travel.id, UserId: user.id });
  };

  const copyTravel = useMutation(TravelRequests.copyTravel, {
    onSuccess: (travel) => {
      const newMember = {
        name: user.name,
        userLogin: user.username,
        TravelId: travel.id,
        UserId: user.id,
      };

      addMember.mutate(newMember);
    },
  });

  // const copyTravelRoutes = useMutation(TravelRequests.copyTravelRoutes, {
  //   onSuccess: (_, id) => {
  //     console.log("tst")
  //     newIdTravel = travel.id;
  //     copyTravelRoutes.mutate({ OldTravelId: oldIdTravel, NewTravelId: travel.id });
  //   }
  // });

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

            {user ? (
              <ProfileBubble />
            ) : (
              <>
                <Button color="inherit" to={"/signin"} component={Link}>
                  Connexion
                </Button>
                <Button color="inherit" to={"/signup"} component={Link}>
                  Inscription
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <main className={classes.content} style={{ backgroundColor: "BackGround" }}>
        <div style={{ height: "6.85%" }}></div>
        <Stack

          direction="column"
          style={{
            backgroundSize: "cover",
            height: "93.15%",
          }}
          height="93.15%"
          width="90%"
          marginLeft="5%"
          justifyContent="flex-start"
        >
          <Typography
            color="primary"
            variant="h2"
            textAlign="center"
            marginTop={8}
          >
            Découvrez tous les voyages partagés par les utilisateurs !
          </Typography>
          <Stack>


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
              {isLoadingL ? (
                <Loading />
              ) : isErrorL ? (
                <p style={{ color: "red" }}>{errorL.message}</p>
              ) : lastTravels.length == 0 ? (
                <>
                  <Typography
                    color="error"
                    variant="h3"
                    textAlign="center"
                    paddingTop={4}
                  >
                    Aucun voyage récent.
                  </Typography>
                </>
              ) : (
                lastTravels.map((travel, index) => (
                  <>
                    {travel.name
                      .toLowerCase()
                      .trim()
                      .includes(
                        <ExplorationTripCard
                          index={index}
                          travel={travel}
                          user={user}
                          handleCLickCopyTravel={handleCLickCopyTravel}
                        />
                      )}
                  </>
                ))
              )}
            </Grid>

          </Stack>
          <TextField
            style={{ width: "40%", marginTop: "2%", marginBottom: "1%" }}
            fullWidth
            label="Chercher un voyage"
            value={filterTravel}
            onChange={(e) => setFilterTravel(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
                <>
                  {travel.name
                    .toLowerCase()
                    .trim()
                    .includes(filterTravel.toLowerCase().trim()) && (
                      <ExplorationTripCard
                        index={index}
                        travel={travel}
                        user={user}
                        handleCLickCopyTravel={handleCLickCopyTravel}
                      />
                    )}
                </>
              ))
            )}
          </Grid>
        </Stack>
      </main>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={"Voyage copié."}
        color="primary"
      ></CustomSnackbar>
    </>
  );
};

export default Exploration;
