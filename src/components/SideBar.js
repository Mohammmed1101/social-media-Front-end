import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import MovieCreationIcon from "@mui/icons-material/MovieCreation"
import AddReactionIcon from "@mui/icons-material/AddReaction"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import GroupIcon from "@mui/icons-material/Group"
import TheatersIcon from "@mui/icons-material/Theaters"
import { createTheme, ThemeProvider } from "@mui/material"
import { Link } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import { useContext } from "react"
import PostsContext from "../utils/PostsContext"
import ChatIcon from '@mui/icons-material/Chat';
import { BsFillFilePostFill } from "react-icons/bs"


const drawerWidth = 240

export default function PermanentDrawerLeft() {
  const { logout } = useContext(PostsContext)

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
        },
        palette: {
          mode: "light",
          primary: { main: "rgb(100, 0, 0)" },
          background: { paper: "rgb(255, 255, 255)" },
        },
      })}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: "1",
            marginTop: "50px"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <Link to="/direct-message">
            <ListItem button>
              <ListItemIcon >
                < ChatIcon />

              </ListItemIcon>
              <ListItemText primary="Direct Message" sx={{ color: "black", textDecoration: "none" }} />
            </ListItem>
          </Link>
          <Link to="/message">
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Message" sx={{ color: "black", textDecoration: "none" }} />
            </ListItem>
          </Link>
          <Link to="/private-posts">
            <ListItem button>
              <ListItemIcon>
                <BsFillFilePostFill style={{ fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText primary="Private Post" sx={{ color: "black", textDecoration: "none" }} />
            </ListItem>
          </Link>
        </List>
        <List sx={{
          height: "40px",
          position: "fixed",
          bottom: "1%",
          width: "100%",
          opacity: "1"
        }}>
          {localStorage.tokenSocial ? (
            <Link to="/login">
              <ListItem button>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="logout" sx={{ color: "black", textDecoration: "none" }} onClick={logout} />
              </ListItem>
            </Link>
          ) : <Link to="/login">
            <ListItem button>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="login" sx={{ color: "black", textDecoration: "none" }} />
            </ListItem>
          </Link>}
        </List>
      </Drawer>
    </ThemeProvider>
  )
}
