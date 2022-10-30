import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Label, Line, LineChart, ResponsiveContainer, XAxis,
  YAxis
} from "recharts";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function Chart() {
  const theme = useTheme();
  const [credits, setCredits] = React.useState([]);
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const fetchData = async () => {
      const res = await axios.get(
        "/api/v1/checkout/payments/?type=credits&limit=10"
      );
      const arr = [];
      res.data.map((credit) => {
        var date = new Date(credit.created_time);
        function pad(s) {
          return s < 10 ? "0" + s : s;
        }
        var time = [pad(date.getDate()), pad(date.getMonth() + 1)].join("/");
        arr.push({ time, amount: credit.value, date: date.toDateString() });
      });
      setCredits(arr.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>
        Since {credits.length > 0 && credits[credits.length - 1].date}
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={credits}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Fund raised ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
