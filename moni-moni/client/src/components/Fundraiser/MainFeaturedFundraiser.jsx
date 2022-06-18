import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";

function MainFeaturedPost({ fundraiser }) {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${fundraiser.image})`,
      }}
      onClick={() => navigate(`/fundraisers/${fundraiser.slug}`)}
    >
      <CardActionArea>
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={fundraiser.image}
            alt={fundraiser.imageText}
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {fundraiser.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {fundraiser.description}
              </Typography>
              <Link variant="subtitle1" href="#">
                {fundraiser.linkText}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  );
}

export default MainFeaturedPost;
