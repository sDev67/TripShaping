import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Stack,
  Button,
  Tabs,
  Typography,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
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

const AppShowcase = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar style={{ height: "6.85%" }}>
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Atlas
            </Typography>
            <Button color="inherit" to={"/signin"} component={Link}>
              Se connecter
            </Button>
            <Button color="inherit" to={"/signup"} component={Link}>
              S'inscrire
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <main className={classes.content}>
        <div style={{ height: "6.85%" }}></div>
        <Stack
          direction="column"
          alignItems="flex-start"
          height="93.15%"
          style={{
            backgroundImage: `url(${require("../assets/appshowcase_1.jpg")})`,
            backgroundSize: "cover",
          }}
        >
          <Stack
            direction="column"
            marginLeft="20%"
            marginTop="10%"
            width="30%"
            spacing={2}
          >
            <Typography variant="h2" textAlign="start" color="primary">
              Explore a world of Trip!
            </Typography>
            <Typography
              style={{ fontWeight: "normal" }}
              color="grey.600"
              variant="h4"
              align="justify"
            >
              Lorem ipsum dolor sit amet. Vel totam nemo ut nisi cumque qui
              consectetur ducimus At dolore harum aut similique repudiandae et
              quidem eaque. Ab veniam harum qui quia itaque in sequi dolores sed
              nulla incidunt quo laboriosam velit ut exercitationem aperiam.
            </Typography>
            <Stack direction="row" paddingTop={2} justifyContent="space-evenly">
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Explorer les voyages
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Créer vos voyages
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-start"
          height="100%"
          style={{
            backgroundImage: `url(${require("../assets/appshowcase_2.jpg")})`,
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Stack
            direction="column"
            marginLeft="20%"
            marginTop="10%"
            width="30%"
            spacing={2}
          >
            <Typography variant="h2" textAlign="start" color="primary">
              Explore a world of Trip!
            </Typography>
            <Typography
              style={{ fontWeight: "normal" }}
              color="grey.600"
              variant="h4"
              align="justify"
            >
              Lorem ipsum dolor sit amet. Vel totam nemo ut nisi cumque qui
              consectetur ducimus At dolore harum aut similique repudiandae et
              quidem eaque. Ab veniam harum qui quia itaque in sequi dolores sed
              nulla incidunt quo laboriosam velit ut exercitationem aperiam.
            </Typography>
            <Stack direction="row" paddingTop={2} justifyContent="space-evenly">
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Explorer les voyages
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Créer vos voyages
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </main>
    </>
  );
};

export default AppShowcase;
