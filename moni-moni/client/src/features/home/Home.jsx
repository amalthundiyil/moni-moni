import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../utils/axios";
import { setAuthToken } from "../auth/services";
import { verifyTokenAsync } from "../auth/asyncActions";
import { useSelector, useDispatch } from "react-redux";
import { useGlobalContext } from "../../context";
import Spinner from "../../components/Spinner";
import Fundraisers from "../../components/Fundraisers";
import Fundraiser from "../../components/Fundraiser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { loading, setLoading } = useGlobalContext();
  const [fundraisers, setFundraisers] = useState([]);
  const [mainFundraiser, setMainFundraiser] = useState();
  const [featuredFundraisers, setFeaturedFundraisers] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setAuthToken(token);
    const verifyTokenTimer = setTimeout(() => {
      dispatch(verifyTokenAsync(true));
    }, 4 * 60 * 1000);
    return () => {
      clearTimeout(verifyTokenTimer);
    };
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // TODO @amal-thundiyil: Fix sign in error after resetting db
      const res = await axios.get("/api/v1/catalogue/fundraisers/");
      const data = await res.data;
      setMainFundraiser(data[0]);
      setFeaturedFundraisers(data.slice(1, 3));
      setFundraisers(data.slice(3));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  if (loading === true) {
    return <Spinner open={true} />;
  }

  return (
    <>
      <Container maxWidth="xl">
        <main>
          <Fundraiser type="main" fundraiser={mainFundraiser} />
          <Grid container spacing={4}>
            {featuredFundraisers.map((fundraiser) => (
              <Fundraiser
                type="featured"
                key={fundraiser.title}
                fundraiser={fundraiser}
              />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {fundraisers.map((fundraiser) => (
              <Fundraiser
                type="normal"
                title="Art"
                key={fundraiser.title}
                fundraiser={fundraiser}
              />
            ))}
          </Grid>
        </main>
      </Container>
    </>
  );
}
