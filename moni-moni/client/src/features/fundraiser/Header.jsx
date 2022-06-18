import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function Header({ fundraiser }) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 600, display: { xs: "none", sm: "none", md: "block" } }}
          image={fundraiser.image}
          alt={fundraiser.imageLabel}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {fundraiser.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {fundraiser.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {fundraiser.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Header;
