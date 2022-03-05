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
  } from "@mui/material";

const MapModeSwitch = ({switchText, handleSwitch, isEdition, markerFilter, handleChangeSelectModeEdit, handleChangeSelectModeNav, editionMode }) => {
  
  
  return (
    <Card
            style={{
              position: "absolute",
              bottom: "25px",
              left: "25px",
              height:"250px"
            }}
          >
            <CardHeader
            style={{textAlign:"center"}}
              title={
                <FormControlLabel
                  value={switchText}
                  control={<Switch color="primary" />}
                  label={switchText}
                  labelPlacement="top"
                  onChange={handleSwitch}
                  checked={isEdition}
                  position="absolute"
                />
              }
            ></CardHeader>
            <CardContent>
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
                    <FormControlLabel
                      value="interestPointOnlyNav"
                      control={<Radio />}
                      label="Points d'intérêt"
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
                        label="Etapes"
                      />
                      <FormControlLabel
                        value="interestPointOnlyEdit"
                        control={<Radio />}
                        label="Points d'intérêt"
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              )}
            </CardContent>
          </Card>
  )
}

export default MapModeSwitch