import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "../../utils/axios";

export default function Deposits() {
  const [deposits, setDeposits] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/payments/?type=deposits&limit=10/");
      setDeposits(res);
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
            <TableCell>Name</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deposits.map((deposit) => (
            <TableRow key={deposit.id}>
              <TableCell>{deposit.date}</TableCell>
              <TableCell>{deposit.title}</TableCell>
              <TableCell align="right">{`$${deposit.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid>
        {/* <Button type="outlined" onClick={(e) => e.preventDefault} sx={{ mt: 3 }}>
          See more deposits
        </Button> */}
      </Grid>
    </React.Fragment>
  );
}
