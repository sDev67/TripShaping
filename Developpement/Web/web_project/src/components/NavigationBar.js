import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Stack,
  Tab,
  Tabs,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import { Link, Outlet, useParams } from "react-router-dom";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { useAuth } from "../Authentication/auth";
import Loading from "../utils/Loading";
import ProfileBubble from "./ProfileBubble";
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

const NavigationBar = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travel,
  } = useQuery(["getTravelById", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  const [value, setValue] = React.useState("Carte");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Box>
          <AppBar
            className={clsx(classes.appBar, open && classes.appBarShift)}
            style={{ height: "6.85%" }}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {value}
              </Typography>
              <ProfileBubble />
            </Toolbar>
          </AppBar>
        </Box>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            textColor="primary"
            indicatorColor="primary"
            alignItems="flex-start"
            centered={false}
            sx={{
              "& .MuiTabs-flexContainer": {
                alignItems: "flex-start",
              },
            }}
          >
            <Tab
              style={{ marginTop: "25px", marginBottom: "40px" }}
              icon={<ArrowCircleLeftRoundedIcon color="error" />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button" color="error">
                    Retour
                  </Typography>
                </Stack>
              }
              value="Retour"
              component={Link}
              to={"/mytrips"}
            />
            <Tab
              icon={<MapRoundedIcon />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button">Carte</Typography>
                </Stack>
              }
              value="Carte"
              component={Link}
              to={"/trip/" + idTravel + "/map"}
            />
            <Tab
              icon={<DirectionsWalkRoundedIcon />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button">Étapes</Typography>
                </Stack>
              }
              value="Étapes"
              component={Link}
              to={"/trip/" + idTravel + "/steps"}
            />
            <Tab
              icon={<AssignmentRoundedIcon />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button">Tâches</Typography>
                </Stack>
              }
              value="Tâches"
              component={Link}
              to={"/trip/" + idTravel + "/todolist"}
            />
            <Tab
              icon={<TextSnippetRoundedIcon />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button">Informations</Typography>
                </Stack>
              }
              value="Informations"
              component={Link}
              to={"/trip/" + idTravel + "/informations"}
            />
            <Tab
              icon={<InsertDriveFileRoundedIcon />}
              iconPosition="start"
              label={
                <Stack
                  style={{ minWidth: "200px" }}
                  direction="row"
                  justifyContent="flex-start"
                  marginLeft={1}
                >
                  <Typography variant="button">Documents</Typography>
                </Stack>
              }
              value="Documents"
              component={Link}
              to={"/trip/" + idTravel + "/documents"}
            />
            {isLoadingT ? (
              <Loading />
            ) : isErrorT ? (
              <p style={{ color: "red" }}>{errorT.message}</p>
            ) : (
              travel.status !== 1 && (
                <Tab
                  icon={<GroupsRoundedIcon />}
                  iconPosition="start"
                  label={
                    <Stack
                      style={{ minWidth: "200px" }}
                      direction="row"
                      justifyContent="flex-start"
                      marginLeft={1}
                    >
                      <Typography variant="button">Membres</Typography>
                    </Stack>
                  }
                  value="Membres"
                  component={Link}
                  to={"/trip/" + idTravel + "/members"}
                />
              )
            )}
            {isLoadingT ? (
              <Loading />
            ) : isErrorT ? (
              <p style={{ color: "red" }}>{errorT.message}</p>
            ) : (
              travel.status !== 1 &&
              travel.UserId == user.id && (
                <Tab
                  icon={<SettingsRoundedIcon />}
                  iconPosition="start"
                  label={
                    <Stack
                      style={{ minWidth: "200px" }}
                      direction="row"
                      justifyContent="flex-start"
                      marginLeft={1}
                    >
                      <Typography variant="button">Options</Typography>
                    </Stack>
                  }
                  value={"Options du voyage"}
                  component={Link}
                  to={"/trip/" + idTravel + "/tripsettings"}
                />
              )
            )}
          </Tabs>
        </Drawer>
        <main
          className={classes.content}
          style={{
            background: backgroundColorMain,
          }}
        >
          <div style={{ height: "6.85%" }}></div>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NavigationBar;
