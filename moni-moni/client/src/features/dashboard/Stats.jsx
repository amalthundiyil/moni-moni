import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";

const Stats = () => {
  const [credits, setCredits] = React.useState([]);
  const [deposits, setDeposits] = React.useState([]);
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const fetchData = async () => {
      const creditRes = await axios.get(
        "/api/v1/checkout/payments/?type=credits"
      );
      setCredits(creditRes.data);
      const depositRes = await axios.get(
        "/api/v1/checkout/payments/?type=deposits"
      );
      setDeposits(depositRes.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <Card sx={{ minWidth: 150, maxWidth: 150 }}>
          <CardContent>
            <Typography sx={{ fontSize: 13 }} variant="h5">
              Total Transactions
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
              {credits.length + deposits.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card sx={{ minWidth: 150, maxWidth: 150 }}>
          <CardContent>
            <Typography sx={{ fontSize: 13 }} variant="h5">
              Total Credits
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
              {credits.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card sx={{ minWidth: 150, maxWidth: 150 }}>
          <CardContent>
            <Typography sx={{ fontSize: 13 }} variant="h5">
              Total Deposits
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }} variant="h5">
              {deposits.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default Stats;
