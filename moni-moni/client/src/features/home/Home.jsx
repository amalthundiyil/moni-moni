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
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Spinner from "../../components/Spinner";
import Fundraisers from "../../components/Fundraisers";
import Fundraiser from "../../components/Fundraiser";
import { groupBy } from "lodash";

import { v4 as uuidv4 } from "uuid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { loading, setLoading } = useGlobalContext();
  const [fundraisers, setFundraisers] = useState({});
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
      let res = await axios.get("/api/v1/catalogue/fundraisers/");
      let data = await res.data;
      setMainFundraiser(data[0]);
      setFeaturedFundraisers(data.slice(1, 3));
      setFundraisers(groupBy(data, "category"));
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
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {featuredFundraisers.map((fundraiser) => (
              <Fundraiser
                type="featured"
                key={uuidv4()}
                fundraiser={fundraiser}
              />
            ))}
          </Grid>
          <Grid container>
            {Object.entries(fundraisers).map(([category, fundraiser]) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <Typography key={uuidv4()} variant="h5" sx={{ m: 4 }}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Fundraisers key={uuidv4()} fundraiser={fundraiser} />
                </React.Fragment>
              );
            })}
          </Grid>
        </main>
      </Container>
    </>
  );
}
