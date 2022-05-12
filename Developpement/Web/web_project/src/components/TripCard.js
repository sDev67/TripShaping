import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CardActionArea,
  Card,
  Grid,
  Stack,
  CardContent,
  Dialog,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import Loading from "./../utils/Loading";

const TripCard = ({travelId}) => {

    const {
        isLoading: isLoadingT,
        isError: isErrorT,
        error: errorT,
        data: travel,
    } = useQuery(["getTravel", travelId], () => TravelRequests.getTravelByid(travelId));


    
    let isActive = travel?.activated;
    return (

        <>
            {isLoadingT ? (
                <Loading />
            ) : isErrorT ? (
                <p style={{ color: "red" }}>{errorT.message}</p>
            ) :

                <Card>
                    <CardActionArea
                        component={Link}
                        to={
                            travel.status == 2
                                ? "/album/" + travelId + "/map"
                                : "/trip/" + travelId + "/map"
                        }>
                        <CardContent>
                            <Stack direction="column">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
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
                                        marginLeft={1}>
                                        {travel.toPublish ? (
                                            <p>Public</p>
                                        ) : (
                                            <p>Privé</p>
                                        )}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    marginLeft={1}
                                >
                                    {travel.status == 0 ? (
                                        <p>Préparation</p>
                                    ) : travel.status == 1 ? (
                                        <p>En cours</p>
                                    ) : (
                                        <p>Terminé</p>
                                    )}
                                </Typography>
                            </Stack>

                            {/* <AvatarGroup max={4}>
                            {trip.members.map((member) => (
                            <>
                                <Avatar {...stringAvatar(member.name)} />
                            </>
                            ))}
                        </AvatarGroup> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            }
        </>
    );
}

export default TripCard;