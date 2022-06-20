import { Snackbar, Alert } from "@mui/material";
import React from "react";

const CustomSnackbar = ({ open, setOpen, message, color }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        variant="filled"
        color={color}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
