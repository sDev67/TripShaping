import {
  Stack,
  Divider,
  List,
  IconButton,
  ListItem,
  Typography,
  Avatar,
  Chip,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import StepIcon from "../assets/stepIcon.png";
import RouteIcon from "../assets/route.png";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import ClearIcon from "@mui/icons-material/Clear";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useEffect } from "react";
import StepRequests from "../requests/StepRequests";
import PointRequests from "../requests/PointRequests";
import Loading from "../utils/Loading";

const Document = ({
  document,
  onRemoveDocument,
  onDisplayDocument,
  isEdition,
  show,
}) => {
  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: step,
    refetch: refetchS,
  } = useQuery(
    ["getStepById", document.StepId],
    () => StepRequests.getStepById(document.StepId),
    { enabled: false }
  );

  const {
    isLoading: isLoadingP,
    isError: isErrorP,
    error: errorP,
    data: point,
    refetch: refetchP,
  } = useQuery(
    ["getPointById", document.PointId],
    () => PointRequests.getPointById(document.PointId),
    { enabled: false }
  );

  useEffect(() => {
    if (document.StepId != null) {
      refetchS();
    } else if (document.PointId != null) {
      refetchP();
    }
  }, []);

  return (
    <>
      <ListItem
        key={document.toString()}
        disablePadding
        secondaryAction={
          <IconButton
            color="error"
            onClick={() => onRemoveDocument(document.id)}
            disabled={!isEdition}
          >
            <ClearIcon />
          </IconButton>
        }
      >
        <ListItemButton onClick={() => onDisplayDocument(document.id)}>
          <ListItemAvatar>
            <InsertDriveFileRoundedIcon color="primary" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Stack direction="row">
                  <Typography width="30%">{document.title}</Typography>
                  {show ? (
                    document.StepId != null ? (
                      isLoadingS ? (
                        <Loading />
                      ) : isErrorS ? (
                        <p style={{ color: "red" }}>{errorS.message}</p>
                      ) : (
                        <>
                          <Tooltip title="Étape" arrow>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <img src={StepIcon} />
                              <Typography
                                variant="h8"
                                style={{ fontWeight: "normal" }}
                              >
                                {step.title}
                              </Typography>
                            </Stack>
                          </Tooltip>
                        </>
                      )
                    ) : document.RouteId != null ? (
                      <>
                        <Tooltip title="Route" arrow>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <img src={RouteIcon} />
                          </Stack>
                        </Tooltip>
                      </>
                    ) : document.PointId != null ? (
                      isLoadingP ? (
                        <Loading />
                      ) : isErrorP ? (
                        <p style={{ color: "red" }}>{errorP.message}</p>
                      ) : (
                        <>
                          <Tooltip title="Point d'intérêt" arrow>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <LocationOnRounded color="secondary"></LocationOnRounded>
                              <Typography
                                variant="h8"
                                style={{ fontWeight: "normal" }}
                              >
                                {point.title}
                              </Typography>
                            </Stack>
                          </Tooltip>
                        </>
                      )
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </Stack>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Document;
