import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

function Main({ fundraiser }) {
  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" gutterBottom>
        Story
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Typography>{fundraiser.description}</Typography>
    </Grid>
  );
}

export default Main;
