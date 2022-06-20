import React, { useState } from "react";
import {
  Card,
  CardContent,
  Popover,
  Stack,
  Avatar,
  Button,
  Typography,

  CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/AvatarColorPicker";
import { useAuth } from "../Authentication/auth";

const ProfileBubble = () => {
  let { user, signout } = useAuth();

  let id = parseInt(user.id);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  function handleClick() {
    setAnchorEl(divRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  return (
    <div ref={divRef}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Avatar
          {...stringAvatar(user.username)}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card>
          <CardHeader
            title={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
              >
                <Avatar {...stringAvatar(user.username)} />
                <Typography variant="button" textAlign="center">
                  {user.username}
                </Typography>
              </Stack>
            }
          ></CardHeader>
          <CardContent>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => navigate("/mytrips")}
              >
                Mes voyages
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => signout()}
              >
                Se déconnecter
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

export default ProfileBubble;
