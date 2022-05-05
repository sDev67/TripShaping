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
import Loading from './../utils/Loading';


const Exploration = () => {

  const { isLoading: isLoadingT, isError: isErrorT, error: errorT, data: travels } = useQuery(
    ['getTravels'], () => TravelRequests.getPublishedTravel()
  );

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
          variant="h2"
          textAlign="center"
          paddingTop={4}
        >
          Découvez tout les voyages partagés par les utilisateurs !
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
            travels.length == 0 ? 
            <>
                  <Typography
                    color="error"
                    variant="h3"
                    textAlign="center"
                    paddingTop={4}
                    >
                    Aucun voyage n'est actuellement publié, pour ne pas publier le votre ? :)
                </Typography>
            </> :
              travels.map((travel, index) => (
                <Grid key={index} item xs={4}>
                  <Card>
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
                              {travel.toPublish}
                            </Typography>
                          </Stack>

                        </Stack>
                      </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>

      </Stack>

    </>
  );
};

export default Exploration;
