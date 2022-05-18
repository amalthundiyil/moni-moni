import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import NormalFundraiser from "../Fundraiser/NormalFundraiser";

function Fundraisers(props) {
  const { posts: fundraiser, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {fundraiser.map((fundraiser) => (
        <NormalFundraiser {...fundraiser} />
      ))}
    </Grid>
  );
}

export default Fundraisers;
