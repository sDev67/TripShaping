import React, { useState } from "react";
import {
  Card,
  Button,
  Stack,
  CardContent,
  Avatar,
  AvatarGroup,
  Typography,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Dialog,
  FormControlLabel,
  Switch,
  Tooltip,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { stringAvatar, stringColor } from "../utils/AvatarColorPicker";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import Loading from "./../utils/Loading";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import MemberRequests from "../requests/MemberRequests";
import CustomSnackbar from "../utils/CustomSnackbar";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ConfirmedSuppressionModal from "./ConfirmedSuppressionModal";
import { generateName } from "../utils/CryptedNameFormatting";

const TripCard = ({ travelId, user, setOpen, setMessage, setColor }) => {
  const queryClient = useQueryClient();

  const [linkalbum, setLink] = useState("");

  const [openOptions, setOpenOptions] = useState(false);

  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] =
    useState(false);

  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);
  };

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) => {
      queryClient.setQueriesData(["getMembers", user.id], (members) => [
        ...members,
        member,
      ]);
      let cryptedName = generateName(member.TravelId);
      console.log(cryptedName);
      const Travel = {
        TravelId: member.TravelId,
        albumURL: cryptedName,
      };
      updateTravel.mutate(Travel);
      setOpen(true);
      setMessage("Voyage dupliqué.");
      setColor("primary");
    },
  });

  const handleCLickCopyTravel = (travelId) => {
    copyTravel.mutate({ TravelId: travelId, UserId: user.id });
  };

  const updateTravel = useMutation(TravelRequests.updateTravelCryptedName, {
    onSuccess: (travel) => {
      queryClient.invalidateQueries(["getTravelById", travel.id]);
    },
  });

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

  let publicItinerary = travel?.toPublish;

  const {
    isLoading: isLoadingM,
    isError: isErrorM,
    error: errorM,
    data: members,
  } = useQuery(["getMembersOfTravel", travelId], () =>
    TravelRequests.getMembersOfTravel(travelId)
  );

  const deleteVoyage = useMutation(TravelRequests.deleteTravel, {
    onSuccess: (travel) => {
      queryClient.invalidateQueries(["getMembers", user.id]);
      HandleCloseConfirmedSuppr();
      setOpenOptions(false);
      setMessage("Voyage supprimé.");
      setColor("primary");
      setOpen(true);
    },
  });

  const updateStatusPublished = (publicItinerary) => {
    const newStatusPublic = {
      TravelId: travelId,
      toPublish: publicItinerary,
    };
    updatePublic.mutate(newStatusPublic);
  };

  const updatePublic = useMutation(
    TravelRequests.updateTravelPublishItinerary,
    {
      onSuccess: (publishedStatus) => {
        queryClient.setQueryData(["getTravel", travelId], publishedStatus);
        queryClient.invalidateQueries(["getTravel", travelId]);
      },
    }
  );

  return (
    <>
      {isLoadingT ? (
        <Loading />
      ) : isErrorT ? (
        <p style={{ color: "red" }}>{errorT.message}</p>
      ) : (
        <>
          <Card>
            <CardMedia height="194" {...stringColor(travel.name)} />
            <CardContent>
              <Stack direction="column">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h4" textAlign="center">
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
                    component={Link}
                    icon={<PhotoRoundedIcon />}
                    tooltipTitle={"Album"}
                    to={"/album/" + travel.albumURL + "/map"}
                  />
                  <SpeedDialAction
                    icon={<FileCopyIcon />}
                    tooltipTitle={"Dupliquer"}
                    onClick={() => handleCLickCopyTravel(travelId)}
                  />
                  {travel.UserId == user.id ? (
                    <SpeedDialAction
                      icon={<SettingsRoundedIcon />}
                      tooltipTitle={"Options"}
                      onClick={() => setOpenOptions(true)}
                    />
                  ) : (
                    <SpeedDialAction
                      icon={<SettingsRoundedIcon />}
                      tooltipTitle={"Options"}
                      disabled
                    />
                  )}
                </SpeedDial>
              </Stack>
            </CardContent>
          </Card>
          <Dialog
            open={confirmedDeleteDialogOpen}
            onClose={HandleCloseConfirmedSuppr}
          >
            <ConfirmedSuppressionModal
              id={travel.id}
              onClose={HandleCloseConfirmedSuppr}
              message="Confirmer la suppression du voyage ?"
              onDelete={deleteVoyage}
            />
          </Dialog>
        </>
      )}

      <Dialog open={openOptions} onClose={() => setOpenOptions(false)}>
        <Card>
          <CardContent>
            <Typography variant="h3" marginBottom={2}>
              Options du voyage
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteRoundedIcon />}
                onClick={() => setConfirmedDeleteDialogOpen(true)}
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Supprimer le voyage
              </Button>

              <FormControlLabel
                value={publicItinerary}
                checked={publicItinerary}
                control={<Switch color="primary" />}
                label={
                  <Typography variant="h6" color="primary">
                    Rendre l'itinéraire public
                  </Typography>
                }
                labelPlacement="start"
                onChange={() => {
                  publicItinerary = !publicItinerary;
                  updateStatusPublished(publicItinerary);
                }}
                position="relative"
              />
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default TripCard;
