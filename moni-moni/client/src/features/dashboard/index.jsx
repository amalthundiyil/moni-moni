import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Chart from "./Chart";
import Credits from "./Credits";
import Deposits from "./Deposits";
import Stats from "./Stats";

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Container sx={{ display: "flex" }}>
      <Box component="main">
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={3}>
            <Grid container spacing={2} justifyContent="space-around" sx={{mt: 4}}>
              <Stats />
            </Grid>
            <Grid item xs={12} md={12} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Credits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Credits />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Deposits />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
