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
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import stepIcon from "../assets/stepIcon.png";
import interestPointIcon from "../assets/interestPointIcon.png";
import stepInterestPointIcon from "../assets/stepInterestPointIcon.png";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MapModeSwitchAlbum = ({
  handleSwitch,
  isEdition,
  markerFilter,
  handleChangeSelectModeEdit,
  handleChangeSelectModeNav,
  editionMode,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        style={{ textAlign: "center", padding: "5px 5px 0px 5px" }}
        title={
          <Stack direction="row" alignItems="center">
            <Typography>Filtrer</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
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
                  label={
                    <Stack direction="row" alignItems="center">
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src={stepInterestPointIcon}
                      ></img>

                      <p>Tout</p>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="stepOnlyNav"
                  control={<Radio />}
                  label={
                    <Stack direction="row" alignItems="center">
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src={stepIcon}
                      ></img>
                      <p>Étapes</p>
                    </Stack>
                  }
                />

                <FormControlLabel
                  value="interestPointOnlyNav"
                  control={<Radio />}
                  label={
                    <Stack direction="row" alignItems="center">
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src={interestPointIcon}
                      ></img>
                      <p>POI</p>
                    </Stack>
                  }
                />
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
                    label={
                      <Stack direction="row" alignItems="center">
                        <img
                          style={{ width: "25px", height: "25px" }}
                          src={stepIcon}
                        ></img>
                        <p>Étapes</p>
                      </Stack>
                    }
                  />

                  <FormControlLabel
                    value="interestPointOnlyEdit"
                    control={<Radio />}
                    label={
                      <Stack direction="row" alignItems="center">
                        <img
                          style={{ width: "25px", height: "25px" }}
                          src={interestPointIcon}
                        ></img>
                        <p>POI</p>
                      </Stack>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MapModeSwitchAlbum;
