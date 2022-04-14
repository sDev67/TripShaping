import { Button, Stack } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link, Outlet, useParams } from "react-router-dom";

const TripSettings = () => {
    const handleSwitch = () => {
        // setExpanded(!expanded);
    };
    return (<>
        <Typography
            color="primary"
            variant="h2"
            textAlign="center"
            marginTop={4}
        >
            Options du voyage
        </Typography>
        <hr />
        <Stack direction="column">
            <FormControlLabel
                value="track"
                control={<Switch color="primary" />}
                label="Suivre ma position lors du voyage"
                labelPlacement="start"
                onChange={handleSwitch}
                position="relative"
            />
            <Button
                variant="contained"
                color="error"
                startIcon={<DeleteRounded />}
                onClick={handleSwitch()}
            >
                Supprimer toutes les étapes du voyage
            </Button>
            <Button
                variant="contained"
                color="error"
                startIcon={<DeleteRounded />}
                onClick={handleSwitch()}
            >
                Supprimer tous les points d'interet du voyage
            </Button>
            <Button
                variant="contained"
                color="error"
                startIcon={<DeleteRounded />}
                onClick={handleSwitch()}
            >
                Supprimer le voyage
            </Button>
            <hr />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSwitch()}
            >
                Démarrer le voyage
            </Button>
        </Stack>
    </>)
};

export default TripSettings;