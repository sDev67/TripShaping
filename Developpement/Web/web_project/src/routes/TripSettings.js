import { Button, Divider, Stack } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, Dialog } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import ConfirmedSuppressionModal from "../components/ConfirmedSuppressionModal";
import { useNavigate } from "react-router-dom";

const TripSettings = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  var today = new Date();
  var dateMax =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travel,
  } = useQuery(["getTravel", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  let statusTrip = travel?.status;
  let plannedDate = travel?.startDate.substring(0, 10);
  let publicItinerary = travel?.toPublish;
  let trackPosition = travel?.positionAgree;

  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] =
    useState(false);

  const date1 = new Date(plannedDate);
  const date2 = new Date(dateMax);
  let selectedDate = date1 > date2 ? dateMax : plannedDate;

  useEffect(() => {
    if (date1 > date2) {
      selectedDate = dateMax;
    } else {
      selectedDate = plannedDate;
    }
    console.log(selectedDate);
  }, [plannedDate]);

  const handleDateChange = (newDate) => {
    console.log(newDate);
    if (newDate != "") {
      plannedDate = newDate;
      updateStartDate(plannedDate);
    }
  };

  const handleSelectedDateChange = (newDate2) => {
    selectedDate = newDate2;
    console.log(selectedDate);
  };

  const handleSwitchPublicItinerary = () => {
    publicItinerary = !publicItinerary;
    updateStatusPublished(publicItinerary);
  };

  const handleSwitchTrackPosition = () => {
    trackPosition = !trackPosition;
    updateTrackPosition(trackPosition);
  };

  const handleSwitchClickStart = () => {
    setStartDialogOpen(true);
  };

  const handleSwitchStartTrip = () => {
    statusTrip = 1;
    updateStatusTravel(statusTrip);
  };

  const updateStatusTravel = (statusTrip) => {
    const newStatus = {
      TravelId: idTravel,
      status: statusTrip,
      startDate: selectedDate,
    };
    updateStatus.mutate(newStatus);
  };

  const updateStartDate = (plannedDate) => {
    const newDate = {
      TravelId: idTravel,
      startDate: plannedDate,
    };
    updateDate.mutate(newDate);
  };

  const updateStatusPublished = (publicItinerary) => {
    const newStatusPublic = {
      TravelId: idTravel,
      toPublish: publicItinerary,
    };
    updatePublic.mutate(newStatusPublic);
  };

  const updateTrackPosition = (trackPosition) => {
    const newStatusPos = {
      TravelId: idTravel,
      positionAgree: trackPosition,
    };
    updatePosition.mutate(newStatusPos);
  };

  const updateStatus = useMutation(TravelRequests.updateTravelStatus, {
    onSuccess: (status) => {
      queryClient.setQueryData(["getTravel", idTravel], status);
      queryClient.invalidateQueries(["getTravel", idTravel]);
      setStartDialogOpen(false);
    },
  });

  const updateDate = useMutation(TravelRequests.updateTravelDate, {
    onSuccess: (startDate) => {
      queryClient.setQueryData(["getTravel", idTravel], startDate);
      queryClient.invalidateQueries(["getTravel", idTravel]);
      selectedDate = plannedDate;
    },
  });

  const updatePublic = useMutation(
    TravelRequests.updateTravelPublishItinerary,
    {
      onSuccess: (publishedStatus) => {
        queryClient.setQueryData(["getTravel", idTravel], publishedStatus);
        queryClient.invalidateQueries(["getTravel", idTravel]);
      },
    }
  );
  const deleteVoyage = useMutation(TravelRequests.deleteTravel, {
    onSuccess: (travel) => {
      HandleCloseConfirmedSuppr();
      navigate("/mytrips");
    },
  });
  const updatePosition = useMutation(TravelRequests.updateTravelTrackPosition, {
    onSuccess: (statusPosition) => {
      queryClient.setQueryData(["getTravel", idTravel], statusPosition);
      queryClient.invalidateQueries(["getTravel", idTravel]);
    },
  });

  const HandleCloseAddLabelForm = () => {
    setStartDialogOpen(false);
  };

  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);
  };

  return (
    <>
      {isLoadingT ? (
        <Loading />
      ) : isErrorT ? (
        <p style={{ color: "red" }}>{errorT.message}</p>
      ) : (
        <Stack height="93.15%" width="100%" direction="column">
          <Stack
            width="40%"
            marginLeft="30%"
            paddingY="1%"
            direction="column"
            height="85%"
            alignItems="strech"
            marginTop="5%"
            spacing={5}
          >
            <Stack direction="row" justifyContent="space-between">
              {/* <FormControlLabel
                value={trackPosition}
                checked={trackPosition}
                control={<Switch color="primary" />}
                label={
                  <Typography variant="h6" color="primary">
                    Suivre ma position lors du voyage
                  </Typography>
                }
                labelPlacement="start"
                onChange={handleSwitchTrackPosition}
                position="relative"
              /> */}
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
                onChange={handleSwitchPublicItinerary}
                position="relative"
              />
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="center">
              {statusTrip == 0 && (
                <TextField
                  fullWidth
                  value={plannedDate}
                  id="date"
                  label="Date de départ prévue"
                  type="date"
                  onChange={(e) => handleDateChange(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </Stack>
            <Stack>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteRounded />}
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
            </Stack>
            <Stack>
              {statusTrip == 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSwitchClickStart()}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                  }}
                >
                  Démarrer le voyage
                </Button>
              )}
            </Stack>
          </Stack>
          <Dialog
            open={confirmedDeleteDialogOpen}
            onClose={HandleCloseConfirmedSuppr}
          >
            <ConfirmedSuppressionModal
              id={travel.id}
              onClose={HandleCloseConfirmedSuppr}
              message="Confirmez la suppression de le voyage ?
                    Cette action est irréversible."
              onDelete={deleteVoyage}
            />
          </Dialog>
          <Dialog open={startDialogOpen} onClose={HandleCloseAddLabelForm}>
            <Stack>
              <Stack
                direction="column"
                margin={5}
                justifyContent="space-evenly"
                spacing={2}
              >
                <Typography variant="h5">Valider la date de départ</Typography>
                <TextField
                  fullWidth
                  id="startdate"
                  defaultValue={selectedDate}
                  label=""
                  type="date"
                  inputProps={{
                    min: "1900-01-01",
                    max: dateMax,
                  }}
                  onChange={(e) => handleSelectedDateChange(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              <Divider />
              <Stack margin={5}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSwitchStartTrip()}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                  }}
                >
                  Démarrer le voyage
                </Button>
              </Stack>
            </Stack>
          </Dialog>
        </Stack>
      )}
    </>
  );
};

export default TripSettings;
