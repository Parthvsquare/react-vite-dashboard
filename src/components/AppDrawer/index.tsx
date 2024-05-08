import { drawerWidth } from "@/common";
import { FourBoxesIcon, KapstanIcon } from "@/icon";
import ColorModeContext from "@/store";
import {
  Bookmark,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Person,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import AppHeader from "../AppHeader";
import { SectionOne } from "./util";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: "#37146B",
  color: "white",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#37146B",
  overflowX: "hidden",
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "purple",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    backgroundColor: "purple",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    backgroundColor: "purple",
  }),
}));

export default function AppDrawer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader open={open} />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              App Drawer
            </Typography>
            <Box>
              <IconButton
                sx={{ ml: 1 }}
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
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="p-0 text-white">
          <List className="w-full">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton disableRipple>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <KapstanIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Kapstan"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerHeader>
        <Divider className="bg-[#4D1B95]" />
        <List className="">
          <ListItem
            key={"application"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FourBoxesIcon className="size-5 " />
              </ListItemIcon>
              <ListItemText
                primary="Application"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider className="bg-[#4D1B95]" />
          {SectionOne.map((text, index) => {
            const Icon = text.icon;
            return (
              <ListItem
                key={text.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Icon key={index} />
                  </ListItemIcon>
                  {!text.tag ? (
                    <ListItemText
                      primary={text.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  ) : (
                    <ListItemText
                      primary={text.title}
                      sx={{ opacity: open ? 1 : 0 }}
                      secondary={
                        <span className="text-xs capitalize text-red-500">
                          {text.tag}
                        </span>
                      }
                    ></ListItemText>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider className="bg-[#4D1B95]" />
        <List
          sx={{
            position: "absolute",
            bottom: "0",
            width: drawerWidth,
          }}
        >
          {(["Admin", "Docs"] as const).map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {index === 0 && <Person />}
                  {index === 1 && <Bookmark />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider className="bg-[#4D1B95]" />

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              {open ? (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <KeyboardDoubleArrowLeft />
                </ListItemIcon>
              ) : (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <KeyboardDoubleArrowRight />
                </ListItemIcon>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="mt-12" />
        {children}
      </Box>
    </Box>
  );
}
