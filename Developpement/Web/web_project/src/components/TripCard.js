import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  CardActionArea,
  Card,
  Button,
  Stack,
  CardContent,
  Avatar,
  AvatarGroup,
  Typography,
  IconButton,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import Loading from "./../utils/Loading";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import MemberRequests from "../requests/MemberRequests";
import CustomSnackbar from "../utils/CustomSnackbar";

const TripCard = ({ travelId, user }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [linkalbum, setLink] = useState("");

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) => {
      queryClient.setQueriesData(["getMembers", user.id], (members) => [
        ...members,
        member,
      ]);
      setOpen(true);
    },
  });

  const handleCLickCopyTravel = (travelId) => {
    copyTravel.mutate({ TravelId: travelId, UserId: user.id });
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

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travel,
  } = useQuery(["getTravel", travelId], () =>
    TravelRequests.getTravelByid(travelId)
  );

  const {
    isLoading: isLoadingM,
    isError: isErrorM,
    error: errorM,
    data: members,
  } = useQuery(["getMembersOfTravel", travelId], () =>
    TravelRequests.getMembersOfTravel(travelId)
  );

  return (
    <>
      {isLoadingT ? (
        <Loading />
      ) : isErrorT ? (
        <p style={{ color: "red" }}>{errorT.message}</p>
      ) : (
        <Card>
          <CardContent>
            <Stack direction="column">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="primary" variant="h4" textAlign="center">
                  {travel.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginLeft={1}
                >
                  {travel.toPublish ? <p>Public</p> : <p>Privé</p>}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" marginLeft={1}>
                {travel.status == 0 ? (
                  <p>Préparation</p>
                ) : travel.status == 1 ? (
                  <p>En cours</p>
                ) : (
                  <p>Terminé</p>
                )}
              </Typography>
            </Stack>

            {isLoadingM ? (
              <Loading />
            ) : isErrorM ? (
              <p style={{ color: "red" }}>{errorM.message}</p>
            ) : (
              <AvatarGroup max={4}>
                {members.map((member, index) => (
                  <Avatar key={index} {...stringAvatar(member.name)} />
                ))}
              </AvatarGroup>
            )}

            <Stack
              marginTop={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {travel.status == 2 ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="primary"
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Éditer
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={"/trip/" + travelId + "/map"}
                  variant="contained"
                  color="primary"
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Éditer
                </Button>
              )}
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction="left"
              >
                <SpeedDialAction
                  icon={<FileCopyIcon />}
                  tooltipTitle={"Dupliquer"}
                  onClick={() => handleCLickCopyTravel(travelId)}
                />
                <SpeedDialAction
                  component={Link}
                  icon={<PhotoRoundedIcon />}
                  tooltipTitle={"Album"}
                  to={"/album/" + travel.albumURL + "/map"}
                />
              </SpeedDial>
            </Stack>
          </CardContent>
        </Card>
      )}
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={"Voyage dupliqué !"}
      ></CustomSnackbar>
    </>
  );
};

export default TripCard;
