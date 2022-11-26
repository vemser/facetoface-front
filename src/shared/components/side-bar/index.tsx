import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

// icons
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface IProps {
  children: React.ReactNode;
}

export const SideBar: React.FC<IProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(30)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt="foto de perfil"
              src=""
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            />
            <Typography>Nome</Typography>
          </Box>

          <Divider />

          <Box flex="1">
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
              {/* item */}
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastrar usuário" />
              </ListItemButton>
              {/* item */}
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastrar candidato" />
              </ListItemButton>
              {/* item */}
              <ListItemButton>
                <ListItemIcon>
                  <VideoCameraFrontIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastrar entrevista" />
              </ListItemButton>
              {/* item */}
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Agenda" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        width={"calc(200% - theme.spacing(30))"}
        marginLeft={theme.spacing(30)}
      >
        {children}
      </Box>
    </>
  );
};
