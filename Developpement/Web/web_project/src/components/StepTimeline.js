import React, {useState} from "react";
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
import {
  Card,
  TextField,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import Loading from "../utils/Loading";

const StepTimeline = ({ steps, isLoadingS, isErrorS, errorS, setPosition }) => {

  const [selectedTimeLineItem, setSelectedTimeLineItem] = useState(null);
  const handleOnClick = (step, index) =>{
    setPosition({ lat: step.latitude, lng: step.longitude })
    setSelectedTimeLineItem(index);
    console.log(index)
  };

  return (
    <Card
      style={{
        right: "3%",
        top: "5%",
        width: 225,
        position: "fixed",
        overflowY: "scroll",
        height: "90%",
      }}
    >
      {isLoadingS ? (
        <Loading></Loading>
      ) : isErrorS ? (
        <p style={{ color: "red" }}>{errorS.message}</p>
      ) : (
        <Timeline position="alternate" style={{}}>
          {steps.map((step, index) => (
            <Button key={index} onClick={() => handleOnClick(step, index)} style={ selectedTimeLineItem === index ? { backgroundColor:"green"} : {}} >
              <TimelineItem >
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
                    component="span"
                    color="primary.main"
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {step.duration} jours
                  </Typography>
                  {/* <Typography color="text.secondary">{step.category}</Typography> */}
                </TimelineContent>
              </TimelineItem>
            </Button>
          ))}
        </Timeline>
      )}
    </Card>
  );
};

export default StepTimeline;
