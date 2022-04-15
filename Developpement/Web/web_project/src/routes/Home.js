import { IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useAuth } from "../Authentication/auth";

const Home = () => {
  const { user, signout } = useAuth();

  return (
    <>
      {!user ? (
        <Stack>
          <IconButton component={Link} to="/signin">
            <AccountCircleRoundedIcon />
          </IconButton>
        </Stack>
      ) : (
        <li key="connected">Connected as {user.username}</li>
      )}
    </>
  );
};

export default Home;
