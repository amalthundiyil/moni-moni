import * as React from "react";
import { AppBar, Toolbar, Typography, Grid, Link } from "@mui/material";
import { Security, Info } from "@mui/icons-material";

const Footer = () => (
  <>
    <Toolbar sx={{ m: 20 }} style={{ justifyContent: "center" }}>
      <Typography variant="caption">
        ©2020 Made with ❤️ by Amal Thundiyil
      </Typography>
    </Toolbar>
  </>
);

export default Footer;
