import { selectedApplicationStore } from "@/store/jotaiStore";
import {
  Computer,
  HistoryOutlined,
  ReportProblemOutlined,
  Settings,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { options } from "./util";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(Number(searchParams.get("tab")) || 0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApplication] = useAtom(selectedApplicationStore);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    setValue(value);
    setSearchParams({ tab: value });
  };

  return (
    <div>
      <div className="item-center flex w-full justify-between">
        <h2>{selectedApplication}</h2>
        <div className="flex items-center justify-center">
          <div>
            <div className="flex items-center justify-center gap-x-2 rounded-md border-2 !border-green-700 bg-green-100 px-2 py-1 text-sm text-green-700">
              <div className="size-2 rounded-full bg-green-700" />
              Deployed
            </div>
          </div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {/* tab section */}
      <Box display="flex" gap={2}>
        <Tabs value={value} onChange={handleChange} className="p-0">
          <Tab
            iconPosition="start"
            icon={<Computer />}
            label="Overview"
            className="py-0 pl-0"
          />
          <Tab
            iconPosition="start"
            icon={<Settings />}
            label="Environment Variables"
          />
          <Tab
            iconPosition="start"
            icon={<ReportProblemOutlined />}
            label="Alerts"
          />
          <Tab
            iconPosition="start"
            icon={<HistoryOutlined />}
            label="Event History"
          />
        </Tabs>
      </Box>
    </div>
  );
}

export default Home;
