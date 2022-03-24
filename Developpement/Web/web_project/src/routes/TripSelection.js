import React, { useState } from "react";
import {
  CardActionArea,
  Card,
  Grid,
  Stack,
  CardContent,
  Dialog,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import TravelRequests from "../requests/TravelRequests";


const TripSelection = () => {

  const { isLoading: isLoadingT, isError: isErrorT, error: errorT, data: travels } = useQuery(
    ['getTravels'], () => TravelRequests.getAllTravel()
  );


  const [tripFormOpen, setTripFormOpen] = useState(false);
  
  let isActive = travels?.activated;

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
          {
          isLoadingT ? 'Chargement...' : isErrorT ? <p style={{ color: 'red' }}>{errorT.message}</p> :
          travels.map((travel, index) => (
            <Grid key={index} item xs={4}>
              <Card>
                <CardActionArea component={Link} to={"/trip/map/" + travel.id}>
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
                          {travel.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          marginLeft={1}
                        >
                          {travel.activated ? <p>Active</p> : <p>Inactive</p>} <br></br>

                        </Typography>
                      </Stack>

                      {/* <AvatarGroup max={4}>
                        {trip.members.map((member) => (
                          <>
                            <Avatar {...stringAvatar(member.name)} />
                          </>
                        ))}
                      </AvatarGroup> */}
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
