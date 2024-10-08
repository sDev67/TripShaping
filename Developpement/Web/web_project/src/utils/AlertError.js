import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const AlertError = ({ message, setMessage, severity }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert
        variant="filled"
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              setMessage("");
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertError;
