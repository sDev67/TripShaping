import React, { useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CircularProgress,
  TextField,
  Popover,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
  Switch,
} from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";

import Editor from "../components/RichTextEditor";
import { useParams } from "react-router-dom";

const Informations = () => {
  const [switchState, setSwitchState] = React.useState(false);
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState();
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: travelDatas,
  } = useQuery(["getInfos", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  const handleChange = () => {
    console.log(value);
    var newTravel = {
      TravelId: idTravel,
      name: travelDatas.name,
      picture: travelDatas.picture,
      activated: travelDatas.activated,
      budget: travelDatas.budget,
      infos: value,
      finished: travelDatas.finished,
    };

    updateInformation.mutate(newTravel);
    console.log("Infos updated ! " + newTravel.infos);
  };

  const updateInformation = useMutation(TravelRequests.updateTravel, {
    onSuccess: (travels) =>
      queryClient.setQueryData(
        ["getInfos", idTravel],
        (travelDatas) => [...travelDatas, travels],
        (value) => [...value, travelDatas.infos]
      ),
  });

  return (
    <>
      <Stack height="93.15%" width="100%" direction="column">
        <Stack
          width="90%"
          marginLeft="5%"
          paddingY="1%"
          direction="column"
          height="100%"
        >
          {isLoading ? (
            <Typography
              color="error"
              variant="h5"
              textAlign="center"
              marginTop={4}
            >
              Chargement...
            </Typography>
          ) : !isError ? (
            <>
              <Editor
                setValue={setValue}
                value={travelDatas.infos !== null ? travelDatas.infos : null}
                minH="500px"
              />
              <Button
                disabled={value === travelDatas.infos ? true : false}
                onClick={(e) => handleChange()}
                variant="contained"
              >
                Sauvegarder les informations
              </Button>
            </>
          ) : (
            <p style={{ color: "red" }}>{error.message}</p>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Informations;
