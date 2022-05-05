import { Button, Stack } from "@mui/material";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";

const TripSettings = () => {
  const [currentDate, setCurrentDate] = useState("");

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleSwitch = () => {
    // setExpanded(!expanded);
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
