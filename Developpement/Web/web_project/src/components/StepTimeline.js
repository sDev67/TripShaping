import React, { useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { styled } from "@mui/material/styles";
import {
  Card,
  Box,
  Slide,
  Stack,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import Loading from "../utils/Loading";
import palette from "../theme/palette";
import { textTruncation } from "../utils/TextTruncation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StepTimeline = ({
  steps,
  isLoadingS,
  isErrorS,
  errorS,
  setPosition,
  setSelectedMarker,
  setExpanded,
  expanded,
}) => {
  const [selectedTimeLineItem, setSelectedTimeLineItem] = useState(null);
  const handleOnClick = (step, index) => {
    setPosition({ lat: step.latitude, lng: step.longitude });
    setSelectedTimeLineItem(index);
    console.log(index);
  };

  const containerRef = React.useRef(null);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          right: "0%",
          height: "100%",
          position: "fixed",
        }}
      >
        <Slide direction="left" in={true} container={containerRef.current}>
          <Box
            sx={{
              overflowY: "scroll",
              backgroundColor: "white",
              height: "100%",
              width: "250px",
            }}
          >
            {isLoadingS ? (
              <Loading></Loading>
            ) : isErrorS ? (
              <p style={{ color: "red" }}>{errorS.message}</p>
            ) : (
              <Timeline style={{ width: 40 }}>
                {steps.map((step, index) => (
                  <TimelineItem
                    onClick={() => handleOnClick(step, index)}
                    style={
                      selectedTimeLineItem === index
                        ? { backgroundColor: palette.primary.main }
                        : {}
                    }
                    onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                  >
                    <TimelineSeparator>
                      <TimelineConnector sx={{ bgcolor: "primary.light" }} />
                      <TimelineDot color="error">
                        <LocationOnRoundedIcon />
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: "primary.light" }} />
                    </TimelineSeparator>

                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography
                        variant="h6"
                        style={{ width: "100%" }}
                        color="primary.main"
                      >
                        {step.title ? textTruncation(step.title, 10) : "Étape"}
                      </Typography>
                      <Typography
                        style={{ width: "100%" }}
                        variant="body2"
                        color="text.secondary"
                        noWrap="true"
                      >
                        {step.duration} jours
                      </Typography>
                      {/* <Typography color="text.secondary">{step.category}</Typography> */}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
          </Box>
        </Slide>
      </Stack>
    </>
  );
};

export default StepTimeline;
