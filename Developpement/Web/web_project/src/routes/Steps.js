import React, {useState} from "react";

import {
  Stack,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const Steps = () => {

    const [steps, setSteps] = useState([
        { id : 1, firstname: "Enzo", lastname: "Mazzarella" },
        { id : 2, firstname: "Vivien", lastname: "Rhiel" },
        { id : 3, firstname: "Baptiste", lastname: "Fléjou" },
        { id : 4, firstname: "Sese", lastname: "dev" },
        { id : 5, firstname: "Oklm", lastname: "Lol" },
        { id : 6, firstname: "azdaz", lastname: "ezf" },
        { id : 7, firstname: "tgrt", lastname: "zef" },
        { id : 8, firstname: "vg", lastname: "za" },
        { id : 9, firstname: "fez", lastname: "jkl" },
        { id : 10, firstname: "Ben", lastname: "Momo" },
        { id : 11, firstname: "Mimi", lastname: "popo" },
        { id : 12, firstname: "zbeul", lastname: "balle" },
        { id : 13, firstname: "rackai", lastname: "dev" },
        { id : 14, firstname: "Benjamin", lastname: "Gallier" },
        { id : 15, firstname: "Serkan", lastname: "Deveci" },
        { id : 16, firstname: "Enzo", lastname: "Mazzarella" },
        { id : 17, firstname: "Philippe", lastname: "Grandpré" },
      ]);
      
  return (
    <>
      <Stack height="100%" width="100%" direction="column">
        <Typography
          color="primary"
          variant="h2"
          textAlign="center"
          marginTop={4}
        >
          Etapes
        </Typography>
        <Stack width="90%" marginLeft="5%" direction="column" height="85%">
          <Typography variant="h4" marginY={1}>
            Nombre d'étapes : {steps.length}
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion>
        </Stack>
      </Stack>
    </>
  );
};

export default Steps;
