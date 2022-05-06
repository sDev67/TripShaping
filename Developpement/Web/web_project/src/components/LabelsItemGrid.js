import "../Styles/ButtonStyles.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack, Box, Divider, Chip } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LabelsItemGrid = ({
  labels,
  OnDeleteLabel,
  OnAddLabel,
  OnSelectLabel,
}) => {
  return (
    <>
      {labels.map((label, index) => (
        <> 
          <Draggable key={`draggable-${index}`} draggableId={`draggable-${index}`} index={index}>
            {(provided) => (
              <Chip
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{ margin: 5 }}
                size="medium"
                onDelete={OnDeleteLabel}
                onClick={OnSelectLabel}
                color="secondary"
                label={label.title}
              />
            )}
          </Draggable>
        </>
      ))}
    </>
  );
};

export default LabelsItemGrid;
