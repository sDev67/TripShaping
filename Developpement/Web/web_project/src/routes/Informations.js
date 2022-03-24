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
  const [updatingStatuts, setUpdatingStatuts] = React.useState(true);
  const idTravel = 1;

  const { isLoading: isLoading, isError: isError, error: error, data: travelDatas } = useQuery(
    ['getInfos', idTravel], () => TravelRequests.getTravel(idTravel)
  );

  const handleChange = () => {
    
    setUpdatingStatuts(false);
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
    console.log('Infos updated ! ' + newTravel.infos);
  };

  const updateInformation = useMutation(TravelRequests.updateTravel,{
    onSuccess: travels => queryClient.setQueryData(
      ['getInfos', idTravel],
      travelDatas => [travels],
      
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
          isLoading || queryClient.isMutating() ? 
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
          <Editor setValue={setValue} value={travelDatas.infos}/>
          <Button onClick={(e) => handleChange()} variant="contained">Sauvegarder les informations</Button>
          </>
          
        :
        <p style={{ color: 'red' }}>{error.message}</p> 
      }
        

      </Stack>
    </>
  );
};

export default Informations;
