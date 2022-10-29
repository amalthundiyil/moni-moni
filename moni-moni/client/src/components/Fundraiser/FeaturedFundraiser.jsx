import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function FeaturedFundraiser({ fundraiser }) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        onClick={() => navigate(`/fundraisers/${fundraiser.slug}`)}
      >
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {fundraiser.title.substring(0, 40)}
              {"..."}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(fundraiser.created).toDateString()}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {fundraiser.description.substring(0, 150)}...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={fundraiser.image}
            alt={fundraiser.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedFundraiser;
