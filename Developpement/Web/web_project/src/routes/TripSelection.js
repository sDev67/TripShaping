import React, { useState } from "react";
import {
  Radio,
  CardActionArea,
  FormControlLabel,
  FormControl,
  Card,
  Grid,
  AvatarGroup,
  Popover,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  Avatar,
  Button,
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, Outlet, NavLink } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";

const TripSelection = () => {
  const [trips, setTrips] = useState([
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Benjamin Gallier",
        },
      ],
    },
    {
      title: "Voyage Paris",
      members: [
        {
          name: "Benjamin Gallier",
        },
        {
          name: "Serkan Deveci",
        },
        {
          name: "Vivien Riehl",
        },
      ],
    },
  ]);

  const [tripFormOpen, setTripFormOpen] = useState(false);

  //const imgMyimageexample = require('../assets/balloons-flying.png');

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        style={{
          backgroundImage: `url(${require("../assets/balloons-flying.jpg")})`,
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Typography
          color="primary"
          variant="h1"
          textAlign="center"
          paddingTop={4}
        >
          Mes voyages
        </Typography>
        <Grid
          marginTop={0}
          paddingX={20}
          container
          justifyContent="flex-start"
          alignItems="center"
          spacing={10}
        >
          {trips.map((trip, index) => (
            <Grid key={index} item xs={4}>
              <Card>
                <CardActionArea component={Link} to="/trip/map">
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Typography
                          color="primary"
                          variant="h4"
                          textAlign="center"
                        >
                          {trip.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          marginLeft={1}
                        >
                          En cours
                        </Typography>
                      </Stack>

                      <AvatarGroup max={4}>
                        {trip.members.map((member) => (
                          <>
                            <Avatar {...stringAvatar(member.name)} />
                          </>
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{marginTop:"100px"}}>
        <Button
          style={{paddingLeft:"25px", paddingRight:"25px", paddingTop:"10px", paddingBottom:"10px"}}
          variant="contained"
          color="primary"
          onClick={() => setTripFormOpen(true)}
         
        >
          <Typography variant="h3">Créer un nouveau voyage</Typography>
        </Button>
        </div>
      </Stack>
      <Dialog open={tripFormOpen} onClose={() => setTripFormOpen(false)}>
        <TripForm></TripForm>
      </Dialog>
    </> 
  );
};

export default TripSelection;
