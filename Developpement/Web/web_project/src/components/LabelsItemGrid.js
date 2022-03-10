import "../Styles/ButtonStyles.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack, Box, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import IconButton from "@mui/material/IconButton";

const LabelsItemGrid = ({
  labels,
  OnDeleteLabel,
  OnAddLabel,
  OnSelectLabel,
}) => {
  return (
    <>
      
        <Box
            textAlign="center"
          sx={{
              padding:1
          }}
        >
          
            {labels.map((label) => (
              <>
                <Chip
                  key={label.toString()}
                  style={{ margin: 5}}
                  size="medium"
                  onDelete={OnDeleteLabel}
                  onClick={OnSelectLabel}
                  color="secondary"
                  label={label.title}
                />
              </>
            ))}
          
        </Box>
      
    </>
  );
};

export default LabelsItemGrid;
