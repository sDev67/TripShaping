import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Stack, Box, Divider, Chip } from "@mui/material";

const Home = () => {
  const finalSpaceCharacters = [
    {
      id: "gary",
      name: "Gary Goodspeed",
    },
    {
      id: "ben",
      name: "Ben Sariras",
    },
    {
      id: "Serk",
      name: "Serk Zebi",
    },
  ];

  return (
    <DragDropContext>
      <Droppable droppableId="characters" direction="horizontal">
        {(provided) => (
          <ul
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {finalSpaceCharacters.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <Chip
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    size="medium"
                    color="secondary"
                    label={name}
                  />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Home;
