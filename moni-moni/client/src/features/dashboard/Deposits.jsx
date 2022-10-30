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
import Title from "./Title";

export default function Deposits() {
  const [deposits, setDeposits] = React.useState([]);
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const fetchData = async () => {
      const res = await axios.get(
        "/api/v1/checkout/payments/?type=deposits&limit=10"
      );
      setDeposits(res.data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deposits.map((deposit) => (
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
    </React.Fragment>
  );
}
