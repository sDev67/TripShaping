import { IconButton, Stack } from "@mui/material";
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Home = () => {

return (
  <>
    <Stack>
      <IconButton component={Link} to='/login'>
        <AccountCircleRoundedIcon />
      </IconButton>
    </Stack>
  
  </>
)

};


export default Home;
