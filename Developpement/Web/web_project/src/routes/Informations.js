import React from "react";
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

const Informations = () => {

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
        <TextField
          style={{margin:"30px"}}
          label="Informations"
          placeholder="Ajouter des informations sur le voyage"
          multiline
          rows={30}
          value={value}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    </>
  );
};

export default Informations;
