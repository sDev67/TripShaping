import React, { useEffect } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";

import RichTextEditor from "../components/RichTextEditor";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";

const Informations = () => {
  const [switchState, setSwitchState] = React.useState(false);
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState();
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const {
    isLoading: isLoadingI,
    isError: isErrorI,
    error: errorI,
    data: travelDatas,
  } = useQuery(["getInfos", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  const handleChange = () => {
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
          {isLoadingI ? (
            <Loading />
          ) : isErrorI ? (
            <p style={{ color: "red" }}>{errorI.message}</p>
          ) : (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4" marginY={1}>
                  Informations liées au voyage
                </Typography>
                <Button
                  disabled={value === travelDatas.infos ? true : false}
                  onClick={(e) => handleChange()}
                  variant="contained"
                >
                  Enregistrer
                </Button>
              </Stack>
              <RichTextEditor
                setValue={setValue}
                value={travelDatas.infos !== null ? travelDatas.infos : null}
                minH="500px"
              />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Informations;
