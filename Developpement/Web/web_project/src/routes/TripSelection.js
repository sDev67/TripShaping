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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import TravelRequests from "../requests/TravelRequests";
import Loading from './../utils/Loading';


const TripSelection = () => {

  const { isLoading: isLoadingT, isError: isErrorT, error: errorT, data: travels } = useQuery(
    ['getTravels'], () => TravelRequests.getAllTravel()
  );

  const navigate = useNavigate();

  const handleOnclickRedirectToVitrine = () =>
  {
      
  }

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
            isLoadingT ? <Loading /> : isErrorT ? <p style={{ color: 'red' }}>{errorT.message}</p> :
              travels.map((travel, index) => (
                <Grid key={index} item xs={4}>
                  <Card>
                    <CardActionArea component={Link} to={"/trip/" + travel.id + "/map"}>
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
                              {travel.toPublish ? <p>{travel.toPublish}</p> : <p> non</p> }

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
        <div style={{ marginTop: "100px" }}>
          <Button
            style={{ paddingLeft: "25px", paddingRight: "25px", paddingTop: "10px", paddingBottom: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => setTripFormOpen(true)}

          >
            <Typography variant="h3">Créer un nouveau voyage</Typography>
          </Button>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Button
            style={{ paddingLeft: "25px", paddingRight: "25px", paddingTop: "10px", paddingBottom: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => navigate('/vitrine')}

          >
            <Typography variant="h3">Explorer des voyages</Typography>
          </Button>
        </div>
      </Stack>
      <Dialog open={tripFormOpen} onClose={() => setTripFormOpen(false)}>
        <TripForm setTripFormOpen={setTripFormOpen}></TripForm>
      </Dialog>
    </>
  );
};

export default TripSelection;
