import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../auth/services";
import { verifyTokenAsync } from "../auth/asyncActions";

export default function Credits() {
  const [credit, setCredit] = React.useState({});
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const fetchData = async () => {
      const credits = await axios.get(
        "/api/v1/checkout/payments/?type=credits&limit=10"
      );
      let total_credit = 0;
      credits.data.map((credit) => {
        total_credit = total_credit + parseFloat(credit.value);
      });
      var localDate = new Date(
        credits.data[credits.data.length - 1].created_time
      ).toDateString();
      setCredit({
        total_credit,
        since_date: localDate,
      });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Credits</Title>
      <Typography component="p" variant="h4">
        ${credit.total_credit}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        since {credit.since_date}
      </Typography>
      {/* <Grid>
        <Button type="outlined" onClick={preventDefault} sx={{ mt: 3 }}>
          See more credits
        </Button>
      </Grid> */}
    </React.Fragment>
  );
}
