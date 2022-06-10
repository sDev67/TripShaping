import React, { useState } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import TravelRequests from "./../requests/TravelRequests";
import { UTurnLeft } from "@mui/icons-material";

const Photos = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);
  const [url, setUrl] = useState();

  const Buffer = require("buffer").Buffer;

  let queryClient = useQueryClient();

  const convertToBase64 = (buffer) => {};

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: photos,
  } = useQuery(["getPhotosOfTravel", idTravel], () =>
    TravelRequests.getPhotosOfTravel(idTravel)
  );

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
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <p style={{ color: "red" }}>{error.message}</p>
          ) : (
            <>
              <ImageList cols={4}>
                {photos.map((photo, index) => (
                  <ImageListItem key={index}>
                    <img
                      style={{}}
                      src={`data:image/jpeg;base64,${
                        photo.dataFile1 + photo.dataFile2
                      }`}
                    />
                    <ImageListItemBar title={photo.date} />
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Photos;
