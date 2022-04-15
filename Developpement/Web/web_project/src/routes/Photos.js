import React from "react";

import {
  Stack,
  Box,
  Label,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const Photos = () => {
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      date: "Lundi 13 février 2012",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      date: "Lundi 13 février 2012",
    },
  ];

  return (
    <>
      <div style={{ height: "93.15%" }} width="100%">
        <Stack
          width="90%"
          marginLeft="5%"
          paddingY="1%"
          direction="column"
          height="100%"
        >
          <ImageList>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=1000&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=1000&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.title} subtitle={item.date} />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </div>
    </>
  );
};

export default Photos;
