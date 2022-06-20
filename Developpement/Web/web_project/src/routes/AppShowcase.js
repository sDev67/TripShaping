import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import image from "../assets/rainbow.png";
import Carousel from "react-material-ui-carousel";
import {
  Stack,
  Button,
  Tabs,
  Typography,
  Avatar,
  Popover,
  AppBar,
  Toolbar,
  Box,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Rating,
  Card,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import Loading from "../utils/Loading";
import MenuIcon from "@mui/icons-material/Menu";
import { Translation, changeLocale } from "@psyycker/react-translation";
import { useAuth } from "../Authentication/auth";
import ProfileBubble from "../components/ProfileBubble";

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
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
}));

const AppShowcase = () => {
  const navigate = useNavigate();

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

  const [language, setLanguage] = useState("fr");

  const handleChangeLanguage = (value) => {
    setLanguage(value);
    changeLocale(value);
  };

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

            <Stack direction="row" width="15%" justifyContent="flex-end">
              <FormControl color="primary">
                <Select
                  value={language}
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  <MenuItem value="fr">🇫🇷</MenuItem>
                  <MenuItem value="en">🇬🇧</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {user ? (
              <ProfileBubble />
            ) : (
              <>
                <Button color="inherit" to={"/signin"} component={Link}>
                  <Translation translationKey="appshowcase.navbar.signin" />
                </Button>
                <Button color="inherit" to={"/signup"} component={Link}>
                  <Translation translationKey="appshowcase.navbar.signup" />
                </Button>
              </>
            )}
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
            marginLeft="10%"
            marginTop="10%"
            width="45%"
            spacing={2}
          >
            <Typography
              variant="h2"
              textAlign="start"
              color="primary"
              style={{ textShadow: "black 2px 2px" }}
            >
              <Translation translationKey="appshowcase.page1.title" />
            </Typography>
            <Typography
              style={{ fontWeight: "normal" }}
              color="grey.700"
              variant="h5"
              align="justify"
            >
              <Translation translationKey="appshowcase.page1.paragraph1" />
              <br />
              <br />
              <Translation translationKey="appshowcase.page1.paragraph2" />
              <br />
              <br />
              <Translation translationKey="appshowcase.page1.paragraph3" />
            </Typography>
            <Stack direction="row" paddingTop={2} justifyContent="space-evenly">
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
                component={Link}
                to={"/discover"}
              >
                <Typography variant="h6">
                  <Translation translationKey="appshowcase.page1.button1" />
                </Typography>
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
                component={Link}
                to={"/mytrips"}
              >
                <Typography variant="h6">
                  <Translation translationKey="appshowcase.page1.button2" />
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          height="100%"
          style={{
            backgroundImage: `url(${require("../assets/notepap.jpeg")})`,
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Typography
            marginY={10}
            variant="h1"
            color="grey.0"
            textAlign="center"
            style={{ visibility: "hidden" }}
          >
            Voyager
          </Typography>
          <Stack direction="row" justifyContent="space-around">
            <Card
              style={{
                backgroundColor: "#df9800",

                width: "35%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  textAlign="start"
                  color="grey.0"
                  marginBottom={3}
                >
                  <Translation translationKey="appshowcase.page2.title1" />
                </Typography>
                <Typography
                  style={{ fontWeight: "normal" }}
                  color="grey.200"
                  variant="h4"
                  align="justify"
                >
                  <Translation translationKey="appshowcase.page2.paragraph11" />
                  <br />
                  <br />{" "}
                  <Translation translationKey="appshowcase.page2.paragraph12" />
                  <br />
                  <br />
                  <Translation translationKey="appshowcase.page2.paragraph13" />
                </Typography>
              </CardContent>
            </Card>
            <Card
              style={{
                backgroundColor: "#0080df",

                width: "35%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h3"
                  textAlign="start"
                  color="grey.0"
                  marginBottom={3}
                >
                  <Translation translationKey="appshowcase.page2.title2" />
                </Typography>
                <Typography
                  style={{ fontWeight: "normal" }}
                  color="grey.0"
                  variant="h4"
                  align="justify"
                >
                  <Translation translationKey="appshowcase.page2.paragraph21" />
                  <br />
                  <br />{" "}
                  <Translation translationKey="appshowcase.page2.paragraph22" />
                  <br />
                  <br />{" "}
                  <Translation translationKey="appshowcase.page2.paragraph23" />
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          height="100%"
          style={{
            backgroundImage: `url(${require("../assets/forest.jpeg")})`,
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Typography
            marginY={10}
            variant="h1"
            color="grey.0"
            textAlign="center"
            style={{ textShadow: "black 2px 2px" }}
          >
            <Translation translationKey="appshowcase.page3.title" />
          </Typography>
          <Carousel navButtonsAlwaysVisible animation="slide" duration={1500}>
            <Stack direction="row" justifyContent="space-around">
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title1" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph1" />
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title2" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph2" />
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title3" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph3" />
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title4" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph4" />
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title5" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph5" />
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    <Translation translationKey="appshowcase.page3.title6" />
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page3.paragraph6" />
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Carousel>
        </Stack>

        <Stack
          direction="column"
          height="100%"
          style={{
            backgroundImage: `url(${require("../assets/beach.jpeg")})`,
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Typography
            marginY={10}
            variant="h1"
            color="grey.0"
            textAlign="center"
            style={{ textShadow: "black 2px 2px" }}
          >
            <Translation translationKey="appshowcase.page4.title" />
          </Typography>
          <Stack direction="row" spacing={5} justifyContent="space-evenly">
            <Card style={{ width: "20%" }}>
              <CardContent>
                <div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom={2}
                  >
                    <Typography variant="h4" textAlign="start" color="primary">
                      <Translation translationKey="appshowcase.page4.title1" />
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page4.paragraph11" />
                    <br />
                    <Translation translationKey="appshowcase.page4.paragraph12" />
                    <br />
                    <Translation translationKey="appshowcase.page4.paragraph13" />
                  </Typography>
                </div>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={1}
                  paddingTop="40%"
                >
                  <Avatar {...stringAvatar("Benjamin  Gallier")} />
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ fontWeight: "normal" }}
                  >
                    Benjamin G
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card style={{ width: "20%" }}>
              <CardContent>
                <div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom={2}
                  >
                    <Typography variant="h4" textAlign="start" color="primary">
                      <Translation translationKey="appshowcase.page4.title2" />
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page4.paragraph21" />
                    <br />
                    <Translation translationKey="appshowcase.page4.paragraph22" />
                  </Typography>
                </div>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={1}
                  paddingTop="40%"
                >
                  <Avatar {...stringAvatar("Vivien Rhiel")} />
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ fontWeight: "normal" }}
                  >
                    Vivien R
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card style={{ width: "20%" }}>
              <CardContent>
                <div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom={2}
                  >
                    <Typography variant="h4" textAlign="start" color="primary">
                      <Translation translationKey="appshowcase.page4.title3" />
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    <Translation translationKey="appshowcase.page4.paragraph31" />
                    <br />{" "}
                    <Translation translationKey="appshowcase.page4.paragraph32" />
                    <br />{" "}
                    <Translation translationKey="appshowcase.page4.paragraph33" />
                  </Typography>
                </div>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={1}
                  paddingTop="40%"
                >
                  <Avatar {...stringAvatar("Enzo Mazzarella")} />
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ fontWeight: "normal" }}
                  >
                    Enzo M
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          height="100%"
          style={{
            backgroundImage: `url(${require("../assets/summerV3.png")})`,
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Stack marginTop="15%">
            <Typography
              marginY={10}
              variant="h1"
              color="grey.0"
              textAlign="center"
              style={{ textShadow: "black 2px 2px" }}
            >
              <Translation translationKey="appshowcase.page5.title" />
            </Typography>
            <Stack direction="row" paddingTop={2} justifyContent="space-evenly">
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "100px",
                  paddingRight: "100px",
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
                component={Link}
                to={"/discover"}
              >
                <Typography variant="h4">
                  <Translation translationKey="appshowcase.page5.button1" />
                </Typography>
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{
                  paddingLeft: "100px",
                  paddingRight: "100px",
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
                component={Link}
                to={"/mytrips"}
              >
                <Typography variant="h4">
                  <Translation translationKey="appshowcase.page5.button2" />
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </main>
    </>
  );
};

export default AppShowcase;
