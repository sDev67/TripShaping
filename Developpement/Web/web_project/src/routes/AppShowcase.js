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
  IconButton,
  AppBar,
  Toolbar,
  Box,
  CardMedia,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Container,
  Grid,
  Rating,
  Card,
  CardContent,
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

const AppShowcase = () => {
  const navigate = useNavigate();

  const classes = useStyles();
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
              Entrez dans un monde de voyages.
            </Typography>
            <Typography
              style={{ fontWeight: "normal" }}
              color="grey.700"
              variant="h5"
              align="justify"
            >
              Vous avez toujours voulu organiser facilement vos voyages ? <br />
              <br />
              Grâce à TripShaping planifiez le voyage de vos rêves à l’aide de
              nos outils faciles d’utilisation qui vous feront gagner un temps
              considérable sur l’organisation et le choix du déroulé de votre
              voyage. Nos outils vous permettront aussi de voir quels sont les
              lieux intéressants à visiter proches de votre destination. <br />
              <br />
              De plus, nous avons une grande communauté de voyageurs qui
              n’hésitent pas à partager leurs itinéraires, itinéraires que vous
              pouvez très facilement dupliquer pour les ajouter à vos propres
              voyages !
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
                component={Link}
                to={"/discover"}
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
                component={Link}
                to={"/mytrips"}
              >
                Créer vos voyages
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
                  Planifiez vos voyages facilement !
                </Typography>
                <Typography
                  style={{ fontWeight: "normal" }}
                  color="grey.200"
                  variant="h4"
                  align="justify"
                >
                  Grâce à notre interface web, planifiez votre voyage simplement
                  à l’aide de notre outil « Carte » qui vous permettra de créer
                  votre propre itinéraire !<br />
                  <br /> Placez les différentes étapes de vos voyages, placez
                  des marqueurs aux endroits et lieux que vous aimeriez visiter,
                  choisissez vos moyens de transport, …
                  <br />
                  <br />
                  En quelques clics le voyage de vos rêves se concrétisera !
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
                  Suivez votre voyage en temps réel !
                </Typography>
                <Typography
                  style={{ fontWeight: "normal" }}
                  color="grey.0"
                  variant="h4"
                  align="justify"
                >
                  Une fois votre voyage planifié et activé, suivez votre voyage
                  en temps réel grâce à notre application mobile (android et
                  ios).
                  <br />
                  <br /> Elle vous permettra de voir à quelle étape de votre
                  voyage vous vous situez, les lieux à visiter proches de vous.
                  Vous pourrez aussi accéder à tous vos documents importés lors
                  de la phase de préparation.
                  <br />
                  <br /> Grâce à cette application mobile, vous saurez
                  exactement où vous en êtes, vers où vous devez vous diriger et
                  les lieux intéressants autour de vous à visiter !
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
            Fonctionnalités
          </Typography>
          <Carousel navButtonsAlwaysVisible animation="slide" duration={1500}>
            <Stack direction="row" justifyContent="space-around">
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Planifiez les tâches restantes
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    N’oubliez rien grâce à notre onglet « Tâches » qui vous
                    permettra d’ajouter les tâches importantes à faire en
                    préparation du voyage. Vous pourrez aussi ajouter des labels
                    à ces taches pour savoir à quelle catégorie correspond
                    chaque tâche.
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Sauvegardez vos documents importants
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    En plus de la planification, TripShapping vous permettra de
                    sauvegarder des documents importants et de les lier à
                    différentes étapes de votre voyage pour les retrouver
                    facilement sur l’application mobile
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Créez votre équipe
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    Ajoutez les membres de votre voyage pour qu’ils vous aident
                    à la planification de celui-ci ! Certains membres de votre
                    voyage ne souhaitent pas s’inscrire sur l’application ? Ce
                    n’est pas grave ! Vous pouvez les ajouter sans inscription
                    préalable pour qu’ils figurent tout de même dans
                    l’application et l’album !
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Gérez vos dépenses lors du voyage
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    Dans notre application mobile vous trouverez un onglet dédié
                    à la gestion des dépenses. Il vous permettra notamment de
                    voir l’état des finances de chaque membre du voyage et ainsi
                    gérer les dépenses équitablement lors du voyage.
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Un album souvenir
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    Une fois votre voyage achevé, vous aurez accès à un album
                    qui vous permettra de retracer votre voyage et votre
                    itinéraire. Vous pourrez ainsi voir les photos prises durant
                    votre voyage ainsi que les textes rédigés par les différents
                    membres du voyage.
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ width: "20%" }}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography variant="h4" textAlign="start" color="primary">
                    Montrez vos exploits !
                  </Typography>

                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    Partagez votre voyage avec vos amis et votre famille grâce à
                    un lien web unique, qui leur permettra de suivre en direct
                    votre voyage, ainsi que les photos et textes que vous
                    partagerez !
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
            Avis
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
                      Une application très pratique !
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    J’ai toujours été très hésitant à planifier des voyages car
                    j’avais beaucoup de mal à m’organiser. <br />
                    Mais depuis que j’ai découvert TripShaping, planifier un
                    voyage est devenu un jeu d’enfant. En quelques clics,
                    j’arrive à obtenir une vision globale de mon voyage et de
                    chaque étape importante de celui-ci. <br />
                    L’interface est claire et simple d’utilisation. Je
                    recommande fortement pour tous ceux qui détestent planifier
                    !
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
                      Je recommande
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    La partie planification possède déjà de nombreuses
                    fonctionnalités mais j’ai surtout été surpris par
                    l’application mobile permettant de suivre son voyage !<br />
                    Non seulement vous pouvez exactement vous situer dans votre
                    voyage mais vous avez aussi accès à tous vos documents, vous
                    pouvez voir les endroits proches à visiter et même gérer vos
                    dépenses.
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
                      Bluffant
                    </Typography>
                    <Rating defaultValue={5} size="large" readOnly />
                  </Stack>
                  <Typography
                    style={{ fontWeight: "normal" }}
                    color="grey.600"
                    variant="h6"
                    align="justify"
                  >
                    Mes amis et moi ne pouvons plus nous passer de TripShapping
                    !<br /> Prévoir et planifier les étapes d’un voyage était
                    toujours fastidieux mais sur cette application c’est devenu
                    un jeu d’enfant.
                    <br /> De plus, une fois le voyage terminé, nous avons accès
                    aux annotations rédigées par chacun d’entre nous mais aussi
                    aux photos prises grâce à l’application. Bref, c’est à
                    refaire !
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
              Créez vous aussi le voyage de vos rêves
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
                <Typography variant="h4">Explorer les voyages</Typography>
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
                <Typography variant="h4">Créer vos voyages</Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </main>
    </>
  );
};

export default AppShowcase;
