import React from 'react'

import {
    Stack,
    AccordionDetails,
    AccordionSummary,
    Accordion,
    Typography,
    Divider,
    Box,
  } from "@mui/material";

import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const StepList = ({steps}) => {
  return (
    <Box marginBottom={5}>
                {steps.map((step, index) => (
                  <Accordion key={index} style={{ backgroundColor: "#F5F5F5" }}>
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                      <Stack direction="column">
                        <Stack direction="row" spacing={5}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography variant="h5">{index + 1}.</Typography>
                            <Typography
                              variant="h5"
                              style={{ fontWeight: "normal" }}
                            >
                              {step.title}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              variant="h5"
                              style={{ fontWeight: "normal" }}
                            >
                              3
                            </Typography>
                            <InsertDriveFileRoundedIcon color="primary"></InsertDriveFileRoundedIcon>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              variant="h5"
                              style={{ fontWeight: "normal" }}
                            >
                              1
                            </Typography>
                            <LocationOnRounded color="error"></LocationOnRounded>
                          </Stack>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          marginLeft={3}
                        >
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            color="primary"
                          >
                            Durée :
                          </Typography>
                          {step.duration > 1 ? (
                            <Typography variant="body">
                              {step.duration} jours
                            </Typography>
                          ) : (
                            <Typography variant="body">
                              {step.duration} jour
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider></Divider>
                      <Stack direction="column" spacing={1} marginTop={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            color="primary"
                          >
                            Catégorie :
                          </Typography>

                          <Typography variant="body">
                            {step.category}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            color="primary"
                          >
                            Description :
                          </Typography>

                          <Typography variant="body">
                            {step.description}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            color="primary"
                          >
                            Documents :
                          </Typography>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              backgroundColor: "primary.dark",
                              "&:hover": {
                                backgroundColor: "primary.main",
                                opacity: [0.9, 0.8, 0.7],
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
  )
}

export default StepList