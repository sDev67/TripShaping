import { Stack } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { useEffect, useState } from "react";

const MemberErrorMsgPanel = ( ) => {
  const [currentTitle, setCurrentTitle] = useState("");

  //   useEffect(() => {
  //     if (label.title !== undefined) {
  //       setCurrentTitle(label.title);
  //     }
  //   }, [label]);



  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h5" marginY={2} sx={{color:'red'}}>
          The fields must not be null. Please fill all info requiered.
        </Typography>
      </Stack>
    </>
  );
};

export default MemberErrorMsgPanel;
