import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Fundraiser Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="Title"
            label="Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fund_total"
            name="fund_total"
            label="Total funding required"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "none" }}>
          <TextField
            id="fund_remaining"
            hidden={true}
            name="fund_remaining"
            label="Fund Remaining"
            fullWidth
            value={0}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="category" name="category" label="Category" fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
