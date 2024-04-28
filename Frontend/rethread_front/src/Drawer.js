import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./App";

export default function TemporaryDrawer() {
    const navigate = useNavigate();
  const { user, setUser } = React.useContext(AppContext);
  const [state, setState] = React.useState({
    right: false,
  });
  const handleLogout = () => {
    setUser({
      user_name: "",
      email: "",
      type: 0,
      contact: "",
      address: "",
      earning: 0,
      cart: [],
      orders: [],
      resell_cart: [],
      password: null,
    });
    navigate('/login');
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Top section with username and ReThread earning */}
      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#4d3d18",
          textAlign: "center",
          color: "white",
        }}
      >
        <Avatar src={user.profile_img} style={{ margin: "auto" }} />
        <Typography
          variant="subtitle1"
          sx={{ marginTop: "8px", fontWeight: "bold", fontSize: "22px" }}
        >
          {user.user_name} {/* Replace with the actual username */}
        </Typography>
      </Box>

      <List>
        {["Profile", "My-Orders"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`./${text.toLowerCase()}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircle /> : <LocalShippingIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {user.email !== "" && (
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "#4d3d18",
            color: "white",
            "&:hover": {
              backgroundColor: "#3b2e12",
            },
            padding: "8px 17px",
            borderRadius: "5px",
            marginTop: "30px",
            marginLeft: "30px",
            marginBottom: "5px",
            fontSize: "16px",
            maxWidth: "180px",
            fontWeight: "bold",
            alignItems: "center",
            display: "block",
          }}
        >
          Log Out
        </Button>
      )}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ color: "white" }}
          >
            <Avatar src={user.profile_img} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
