import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Card,
  Stack,
  CardContent,
  Snackbar,
  Button,
  Typography,
  SpeedDial,
  CardMedia,
  SpeedDialAction,
  AppBar,
  Toolbar,
  Box,
  SpeedDialIcon,
  Grid,
  Rating,
  CardHeader,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { stringColor, stringAvatar } from "../utils/AvatarColorPicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TripForm from "../components/TripForm";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import MemberRequests from "../requests/MemberRequests";
import Loading from "../utils/Loading";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../Authentication/auth";
import ProfileBubble from "../components/ProfileBubble";
import CustomSnackbar from "../utils/CustomSnackbar";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";

const ExplorationTripCard = ({
  index,
  travel,
  user,
  handleCLickCopyTravel,
}) => {
  return (
    <Grid key={index} item xs={4}>
      <Card>
        <CardMedia
          height="194"
          //   image="https://source.unsplash.com/1600x900/?beach"
          {...stringColor(travel.name)}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="h4" textAlign="center">
              {travel.name}
              {travel.toPublish}
            </Typography>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              icon={<SpeedDialIcon />}
              direction="left"
            >
              {user && (
                <SpeedDialAction
                  icon={<FileCopyIcon />}
                  tooltipTitle={"Copier"}
                  onClick={() => handleCLickCopyTravel(travel)}
                />
              )}
              <SpeedDialAction
                component={Link}
                icon={<PhotoRoundedIcon />}
                tooltipTitle={"Visualiser"}
                to={"/display/" + travel.id + "/map"}
              />
            </SpeedDial>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ExplorationTripCard;
