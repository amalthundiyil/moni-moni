import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function preventDefault(event) {
  event.preventDefault();
}

export default function Credits() {
  const [credits, setCredits] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/payments/?type=credits&limit=10/");
      setCredits(res);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Credits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <Grid>
        <Button type="outlined" onClick={preventDefault} sx={{ mt: 3 }}>
          See more credits
        </Button>
      </Grid>
    </React.Fragment>
  );
}
