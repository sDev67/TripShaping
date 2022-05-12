import { Button, Stack } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";

const TripSettings = () => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [currentDate, setCurrentDate] = useState("");

  const [publicItinierary, setPublicItinierary] = useState(false);

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleSwitch = () => {
    // setExpanded(!expanded);
  };

  const updateStatus = useMutation(TravelRequests.updateTravelPublishItinerary, {
    onSuccess: (publishedStatus) => {
      queryClient.setQueryData(["getTravel", idTravel], publishedStatus);
      queryClient.invalidateQueries(["getTravel", idTravel]);
    },
  });

  // Fonction qui met a jour les propriétés d'un point d'interet
  const updateStatusPublished = (publicItinierary) => {

    const newStatus = {
      TravelId: idTravel,
      toPublish: publicItinierary,
    };
    updateStatus.mutate(newStatus);

  };

  const handleSwitchPublicItinerary = () => {

    setPublicItinierary(!publicItinierary);
    updateStatusPublished(publicItinierary)


  };

  return (
    <>
      <Stack height="93.15%" width="100%" direction="column">
        <Stack
          width="40%"
          marginLeft="30%"
          paddingY="1%"
          direction="column"
          height="85%"
          alignItems="strech"
          marginTop="5%"
        >
          <Stack spacing={5}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={handleSwitch()}
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Supprimer toutes les étapes du voyage
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={handleSwitch()}
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Supprimer tous les points d'interet du voyage
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={handleSwitch()}
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

          <Stack direction="row" spacing={1} marginTop={10} marginBottom={5}>
            <TextField
              sx={{ width: "50%" }}
              id="date"
              label="Date de départ prévue"
              type="date"
              onChange={(e) => handleDateChange(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              sx={{ width: "50%" }}
              value="track"
              control={<Switch color="primary" />}
              label={
                <Typography variant="h6" color="primary">
                  Suivre ma position lors du voyage
                </Typography>
              }
              labelPlacement="start"
              onChange={handleSwitch}
              position="relative"
            />
          </Stack>
          <Stack direction="row" marginBottom={5} justifyContent="space-evenly">
            <FormControlLabel
              sx={{ width: "58%" }}
              value={publicItinierary}
              control={<Switch color="primary" />}
              label={
                <Typography variant="h6" color="primary">
                  Rendre l'itinéraire public à la fin du voyage
                </Typography>
              }
              labelPlacement="start"
              onChange={handleSwitchPublicItinerary}
              position="relative"
            />
          </Stack>

          <Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSwitch()}
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
      </Stack>
    </>
  );
};

export default TripSettings;
