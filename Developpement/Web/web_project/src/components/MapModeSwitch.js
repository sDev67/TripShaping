import React from 'react'
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
  Switch,
  MenuItem,
  Button,
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
  CardHeader,
  Tooltip
} from "@mui/material";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MapModeSwitch = ({ switchText, handleSwitch, isEdition, markerFilter, handleChangeSelectModeEdit, handleChangeSelectModeNav, editionMode }) => {
  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  const interestPointIcon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        position: "absolute",
        bottom: "25px",
        left: "10px",
        // height: "100px"
      }}
    >
      <CardHeader
        style={{ textAlign: "center", padding: "5px 5px 0px 5px" }}
        title={
          <>
            <FormControlLabel
              value={switchText}
              control={<Switch color="primary" />}
              label={switchText}
              labelPlacement="top"
              onChange={handleSwitch}
              checked={isEdition}
              position="absolute"
            />
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </>
        }
      ></CardHeader>
      <Collapse in={expanded}>
        <CardContent style={{ padding: "0px 5px 5px 5px" }}>
          {!isEdition && (
            <FormControl>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={markerFilter}
                onChange={handleChangeSelectModeNav}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Tout"
                />
                <FormControlLabel
                  value="stepOnlyNav"
                  control={<Radio />}
                  label="Etapes"
                />
                <Tooltip title="Points d'intérêt" placement='right'>
                  <FormControlLabel
                    value="interestPointOnlyNav"
                    control={<Radio />}
                    label="POI"
                  />
                </Tooltip>
              </RadioGroup>
            </FormControl>
          )}

          {isEdition && (
            <>
              <FormControl>
                <RadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={editionMode}
                  onChange={handleChangeSelectModeEdit}
                >
                  <FormControlLabel
                    value="stepOnlyEdit"
                    control={<Radio />}
                    label="Etapes"
                  />
                  <Tooltip title="Points d'intérêt" placement='right' style={{ backgroundColor: "white" }}>
                    <FormControlLabel
                      value="interestPointOnlyEdit"
                      control={<Radio />}
                      label="POI"
                    />
                  </Tooltip>
                </RadioGroup>
              </FormControl>
            </>
          )}
        </CardContent>
      </Collapse>

    </Card>
  )
}

export default MapModeSwitch