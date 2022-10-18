import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { List, ListItem, ListItemText, TextField } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://moni-moni.herokuapp.com">
        Moni Moni
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const quickLink = ["Home", "About Us", "Blog Post", "Photo Gallery"]
const getInTouch = ["Contact Us", "Our Services"]

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "black", py: 6 }}>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          sx={{ maxWidth: "20%", color: "white", marginTop: "6%", fontWeight: "bold" }}
        >
          10K Worldwide Client Already Connected
        </Typography>

        <List sx={{ maxWidth: "50%", display: "flex", flexDirection: "column" }} >
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">Quick Link</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">Home</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">About Us</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">Blog Post</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">Photo Gallery</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <List sx={{ maxWidth: "50%", display: "flex", flexDirection: "column", marginLeft: "7%" }} >
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">Get In Touch</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">Contact Us</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">Our Services</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <List sx={{ maxWidth: "20%", display: "flex", flexDirection: "column", marginLeft: "7%" }} >
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">Address</Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText >
              <Typography sx={{ color: "white" }} variant="h6">
                2464 Royal Ln. Mesa, NewJersey 45463
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <TextField
          required
          id="filled-basic"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
          color="primary"
          sx={{color: "white"}}
        />
      </Container>
    </Box>
  );
}

export default Footer;
