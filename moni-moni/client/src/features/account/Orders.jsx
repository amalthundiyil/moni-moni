import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [type, setType] = React.useState("deposits");
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/checkout/payments/?type=${type}`);
      setOrders(res.data);
    };
    fetchData();
  }, [type]);

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h3" gutterBottom>
          Orders
        </Typography>
      </Grid>
      <Grid item>
        <Select
          id="type"
          name="type"
          label="Type"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"credits"}>Credits </MenuItem>
          <MenuItem value={"deposits"}>Deposits </MenuItem>
        </Select>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((deposit) => (
            <TableRow key={deposit.id}>
              <TableCell>
                {new Date(deposit.created_time).toDateString()}
              </TableCell>
              <TableCell>{deposit.fundraiser_title}</TableCell>
              <TableCell align="right">{`$${deposit.value}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Grid>
        <Button type="outlined" onClick={(e) => e.preventDefault} sx={{ mt: 3 }}>
          See more deposits
        </Button>
      </Grid> */}
    </Grid>
  );
}
