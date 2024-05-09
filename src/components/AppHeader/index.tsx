import { drawerWidth } from "@/common";
import { allApplications } from "@/common/endpoints";
import { type Application } from "@/common/types/custom";
import ColorModeContext from "@/store";
import {
  applicationsStore,
  selectedApplicationStore,
} from "@/store/jotaiStore";
import { KeyboardArrowDown } from "@mui/icons-material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { deepOrange } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useContext, useEffect, useState } from "react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    paddingLeft: theme.spacing(7),
    width: `calc(100% -(${theme.spacing(7)} + 1px))`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% -(${theme.spacing(8)} + 1px))`,
    },
    transition: theme.transitions.create(["width", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "transparent",
  borderBottom: "1px solid #f0f0f0",
}));

interface IProps {
  open: boolean;
}
function AppHeader({ open }: IProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [allApplicationStore, setApplicationStore] = useAtom(applicationsStore);

  const [application, setApplication] = useAtom(selectedApplicationStore);

  const { data: allApplicationData, isLoading } = useQuery<
    Record<"data", Application[]>
  >({
    queryKey: ["allApplications"],
    queryFn: () => allApplications(),
  });

  useEffect(() => {
    if (!isLoading) {
      setApplicationStore(allApplicationData?.data || []);
    } else {
      setApplicationStore([]);
    }
  }, [isLoading, allApplicationData]);

  function handleChange(
    event: SelectChangeEvent<Application>,
    child: React.ReactNode,
  ) {
    const application = allApplicationStore.find(
      (app) => app.name === event.target.value,
    ) as Application;
    setApplication(application);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          color={theme.palette.text.primary}
          width={"100%"}
        >
          <Box>
            <FormControl className="min-w-[200px]">
              <InputLabel
                variant="standard"
                id="applications-label"
                className="text-xs"
              >
                Application
              </InputLabel>
              <Select
                labelId="applications"
                id="applications-selection"
                value={application}
                label="applications"
                onChange={handleChange}
                variant="standard"
              >
                {isLoading && (
                  <MenuItem value="loading">
                    <CircularProgress size={20} />
                  </MenuItem>
                )}
                {!isLoading &&
                  allApplicationStore.map((app, index) => (
                    <MenuItem key={app.id + index} value={app.name}>
                      {app.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: deepOrange[500], fontWeight: "800" }}>
              JD
            </Avatar>
            <div>
              <Button
                id="profile-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleClick}
              >
                John Doe
                <KeyboardArrowDown />
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openProfile}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>

            <IconButton
              // sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <ModeNightIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
