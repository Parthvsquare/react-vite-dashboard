import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircleOutlineOutlined, Circle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import SystemMetrics from "../SystemMetrics";
import EventHistory from "../EventHistory";

const desiredVersion = "1.2.1";

function Overview() {
  return (
    <div className="mt-5">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="service-info-header"
        >
          <h3 className="py-0">Service Info</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-center justify-start gap-x-4">
            <div>
              <h4>Current Version</h4>
              <span className="flex items-center gap-x-1">
                <CheckCircleOutlineOutlined sx={{ color: "green" }} />
                <span>In Sync</span>
              </span>
            </div>
            <div>
              <h4>Desired Version</h4>
              <span>{desiredVersion}</span>
            </div>
          </div>
          <div className="mb-3 mt-6 flex items-end justify-between">
            <Button variant="contained" color="primary">
              Deploy
            </Button>
            <Typography variant="caption">Last updated 5 hours ago</Typography>
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="mt-5 grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <SystemMetrics />
        </div>
        <div className="col-span-2">
          <EventHistory />
        </div>
      </div>
    </div>
  );
}

export default Overview;
