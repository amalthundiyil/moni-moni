import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProgressBar from "../../components/ProgressBar";

function Header({ fundraiser }) {
  return (
    <Card>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <CardMedia
            component="img"
            sx={{
              maxHeight: "100%",
            }}
            image={fundraiser.image}
            alt={fundraiser.imageLabel}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent sx={{ m: 3 }}>
            <Typography component="h2" variant="h5">
              {fundraiser.title}
            </Typography>
            <br />
            <ProgressBar
              progress={
                (fundraiser.total_amount - fundraiser.remaining_amount) /
                fundraiser.total_amount
              }
            />
            <br />
            <Typography variant="h4" color="text.primary">
              ${fundraiser.total_amount - fundraiser.remaining_amount} raised
            </Typography>
            <Typography variant="h5" color="text.secondary">
              ${fundraiser.remaining_amount} remaining
            </Typography>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  href={`/checkout/${fundraiser.slug}`}
                  disabled={!fundraiser.is_active}
                >
                  Contribute to this fundraiser
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Header;
