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
  console.log(fundraiser);
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
          <br />
          <ProgressBar
            progress={
              (fundraiser.fund_total - fundraiser.fund_remaining) /
              fundraiser.fund_total
            }
          />
          <br />
          <Typography variant="h4" color="text.primary">
            USD {Math.round(fundraiser.fund_total - fundraiser.fund_remaining)}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            USD {Math.round(fundraiser.fund_remaining)} remaining
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
                href={`/fundraisers/${fundraiser.slug}/pricing`}
                disabled={!fundraiser.is_active}
              >
                Contribute to this fundraiser
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Header;
