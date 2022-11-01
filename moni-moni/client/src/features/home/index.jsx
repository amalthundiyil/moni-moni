import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Fundraiser from "../../components/Fundraiser";
import Fundraisers from "../../components/Fundraisers";
import Spinner from "../../components/Spinner";

import { v4 as uuidv4 } from "uuid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home({
  fundraisers,
  mainFundraiser,
  featuredFundraisers,
}) {
  if (!fundraisers || !mainFundraiser || !featuredFundraisers) {
    return <Spinner open={true} />;
  }

  return (
    <Grid container>
      <Grid container spacing={4} sx={{ m: 2 }}>
        <Fundraiser type="main" fundraiser={mainFundraiser} />
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{ ml: 2, mr: 2 }}
        justifyContent="center"
        alignItems="center"
      >
        {featuredFundraisers.map((fundraiser) => {
          return (
            <Fundraiser
              type="featured"
              key={uuidv4()}
              fundraiser={fundraiser}
            />
          );
        })}
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{ mb: 4 }}
        xs={12}
        justifyContent="center"
      >
        {Object.entries(fundraisers).map(([category, fundraiser]) => {
          return (
            <Grid item key={uuidv4()}>
              <Typography key={uuidv4()} variant="h5" sx={{ m: 4 }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              <Fundraisers key={uuidv4()} fundraiser={fundraiser} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
