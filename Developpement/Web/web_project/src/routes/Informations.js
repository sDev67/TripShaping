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
} from "@mui/material";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import TravelRequests from "../requests/TravelRequests";

import Editor from '../components/RichTextEditor'

const Informations = () => {

  const queryClient = useQueryClient();
  const [value, setValue] = React.useState("");
  const idTravel = 1;

  const { isLoading: isLoading, isError: isError, error: error, data: travelDatas } = useQuery(
    ['getInfos', idTravel], () => TravelRequests.getTravel(idTravel)
  );

  const handleChange = () => {
    
    var newTravel = 
    {
      TravelId:idTravel,
      name:travelDatas.name,
      picture:travelDatas.picture,
      activated:travelDatas.activated,
      budget:travelDatas.budget,
      infos:value,
      finished:travelDatas.finished,
    }

    updateInformation.mutate(newTravel);
  };

  

  const updateInformation = useMutation(TravelRequests.updateTravel,{
    onSuccess: infos => queryClient.setQueryData(
      ['getInfos', idTravel],
      setValue(infos.infos)
      )
    }
  )


  return (
    <>
      <Stack direction="column" width="100%" >
        <Typography
          color="primary"
          variant="h2"
          textAlign="center"
          marginTop={4}
        >
          Informations
        </Typography>
        {
          isLoading ? 
          <Typography
            color="error"
            variant="h5"
            textAlign="center"
            marginTop={4}>
              Chargement...
          </Typography>

        :
          
          !isError ?
          <>

            {/*<TextField
            style={{margin:"30px"}}
            label="Informations"
            placeholder="Ajouter des informations sur le voyage"
            multiline
            rows={30}
            value={travelDatas.infos}
            onChange={(e) => setValue(e.target.value)}
            InputLabelProps={{
            shrink: true,
            }}
          />*/}
          <Editor/>
          <Button onClick={(e) => handleChange()} variant="contained">Sauvegarder les informations</Button>s
          </>
          
        :
        console.log({error})
      }
        

      </Stack>
    </>
  );
};

export default Informations;
