import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fundraisers from "../../components/Fundraisers";
import FundraiserCard from "../../components/Fundraiser";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../auth/services";
import { verifyTokenAsync } from "../auth/asyncActions";
import { useSelector, useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [featFundraisers, setFeatFundraisers] = useState([]);
  const { token, refresh, expiredAt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(token, refresh);
  useEffect(() => {
    setAuthToken(token, refresh);
    const verifyTokenTimer = setTimeout(() => {
      dispatch(verifyTokenAsync(true));
    }, 4 * 60 * 1000);
    return () => {
      clearTimeout(verifyTokenTimer);
    };
  }, [expiredAt, token]);

  // useEffect(async () => {
  //   const res = await axios.get("/catalogue/fundraisers/");
  // }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Album layout
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Main call to action</Button>
          <Button variant="outlined">Secondary action</Button>
        </Stack>
      </Container>
      <Box sx={{ flexGrow: 1 }} m={10}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FundraiserCard
              type="featured"
              cardWidth={1000}
              data={featFundraisers[0]}
            />
          </Grid>
          <Grid item xs={4}>
            <FundraiserCard
              type="featured"
              cardWidth={500}
              data={featFundraisers[1]}
            />
          </Grid>
          <Grid item xs={4}>
            <FundraiserCard
              type="featured"
              cardWidth={500}
              data={featFundraisers[2]}
            />
          </Grid>
          <Grid item xs={8}>
            <FundraiserCard
              type="featured"
              cardWidth={1000}
              data={featFundraisers[3]}
            />
          </Grid>
        </Grid>
      </Box>
      <Fundraisers />
      <Fundraisers />
      <Fundraisers />
    </>
  );
}
