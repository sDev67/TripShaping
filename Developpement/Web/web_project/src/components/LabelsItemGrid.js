import "../Styles/ButtonStyles.css";
import { Chip } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
const LabelsItemGrid = ({
  labels,
  OnDeleteLabel,
  OnSelectLabel,
}) => {
  return (
    <>
      {labels.map((label, index) => (
        <>
          <Chip
            style={{ margin: 5 }}
            size="medium"
            onDelete={OnDeleteLabel}
            onClick={OnSelectLabel}
            color="secondary"
            label={label.title}
          />
        </>
      ))}
    </>
  );
};

export default LabelsItemGrid;
