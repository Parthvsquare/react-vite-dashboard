import { eventHistory } from "@/common/endpoints";
import { type EventHistory } from "@/common/types/custom";
import { getRemainingTimeDifference } from "@/common/utils";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { useMemo, useState } from "react";

function EventHistory() {
  const [openDialog, setOpenDialog] = useState(false);

  const { data: eventHistoryData, isLoading } = useQuery<
    Record<"data", EventHistory[]>
  >({
    queryKey: ["getEventHistory"],
    queryFn: () => eventHistory(),
  });

  const sortedEventData = useMemo(() => {
    if (isLoading) return [];
    if (!eventHistoryData?.data) return [];
    return eventHistoryData.data?.sort((a, b) =>
      compareDesc(new Date(a.timestamp), new Date(b.timestamp)),
    );
  }, [eventHistoryData?.data, isLoading]);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Event</TableCell>
              <TableCell align="left" className="font-bold">
                Version
              </TableCell>
              <TableCell align="right" className="font-bold">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}

            {sortedEventData &&
              structuredClone(sortedEventData)
                .splice(0, 4)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.timestamp + row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <span>
                          <span className="block font-medium">{row.event}</span>
                          <Typography
                            variant="caption"
                            className="block text-gray-600"
                          >
                            {getRemainingTimeDifference(row.timestamp)}
                          </Typography>
                        </span>
                      </TableCell>
                      <TableCell align="left">{row.version}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <div className="ml-2">
          {sortedEventData && sortedEventData.length > 4 && (
            <Button
              variant="text"
              onClick={() => setOpenDialog(true)}
              className="capitalize underline underline-offset-2"
            >
              View more
            </Button>
          )}
        </div>
      </TableContainer>
      {openDialog && (
        <EventHistoryDialog
          open={openDialog}
          handleClose={setOpenDialog}
          eventData={eventHistoryData?.data}
        />
      )}
    </Paper>
  );
}

export default EventHistory;

// dialog for all event logs
function EventHistoryDialog({
  open,
  handleClose,
  eventData,
}: {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: EventHistory[] | undefined;
}) {
  return (
    <Dialog
      onClick={() => handleClose(false)}
      aria-labelledby="event-history-dialog"
      open={open}
      maxWidth="lg"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="event-history-dialog">
        Event History
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <TableContainer>
          <Table aria-label="event table">
            <TableHead>
              <TableRow className="font-extrabold">
                <TableCell>Event</TableCell>
                <TableCell align="right">Version</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventData &&
                eventData.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <span>
                          <span className="font-medium">{row.event}</span>
                          <br />
                          <Typography
                            variant="caption"
                            className="block text-gray-600"
                          >
                            {getRemainingTimeDifference(row.timestamp)}
                          </Typography>
                        </span>
                      </TableCell>
                      <TableCell align="right">{row.version}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}
