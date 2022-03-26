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
import { useQuery, useQueryClient, useMutation } from 'react-query';
import TravelRequests from "../requests/TravelRequests";

import Editor from '../components/RichTextEditor'

const Informations = () => {

  const [switchText, setSwitchText] = React.useState("Lecture");
  const [switchState, setSwitchState] = React.useState(false)
  const queryClient = useQueryClient();
  const [value, setValue] = React.useState();
  const idTravel = 1;

  const { isLoading: isLoading, isError: isError, error: error, data: travelDatas } = useQuery(
    ['getInfos', idTravel], () => TravelRequests.getTravel(idTravel)
  );

  const handleSwitch = (event) => {
    setSwitchState(event.target.checked)

    if(switchState)
    {
      setSwitchState("Écriture");
    }
    else{
      setSwitchState("Lecture");
    }
  }


  const handleChange = () => {
    
    console.log(value);
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
      travelDatas => [...travelDatas, travels],
      value => [...value, travelDatas.infos],
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
          isLoading  ? 
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
         <FormControlLabel
                  value={switchText}
                  control={<Switch color="primary" />}
                  label={switchText}
                  labelPlacement="left"
                  onChange={handleSwitch}
                  checked={switchState}
                  position="absolute"
                />

          {
            !switchState ? 
            
            <TextField value={travelDatas.infos}/> : 
            <>
              <Editor setValue={setValue} value={travelDatas.infos}/>
              <Button disabled={value === travelDatas.infos ? true : false}  onClick={(e) => handleChange()} variant="contained">Sauvegarder les informations</Button>
            
            </>
     
          }
       
         
         
          </>
          
        :
        <p style={{ color: 'red' }}>{error.message}</p> 
      }
        

      </Stack>
    </>
  );
};

export default Informations;
