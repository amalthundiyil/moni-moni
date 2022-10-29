import { Grid } from "@mui/material";
import { groupBy } from "lodash";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { useGlobalContext } from "../context";
import AboutUs from "../features/aboutUs";
import Account from "../features/account";
import { verifyTokenAsync } from "../features/auth/asyncActions";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import { setAuthToken } from "../features/auth/services";
import Checkout from "../features/checkout";
import ContactUs from "../features/contactUs";
import Dashboard from "../features/dashboard";
import Discover from "../features/discover";
import Error from "../features/error";
import Fundraiser from "../features/fundraiser";
import Home from "../features/home";
import axios from "../utils/axios";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const { isAuthenticated, verifyStatus, token } = useSelector(
    (state) => state.auth
  );
  const { loading, setLoading } = useGlobalContext();
  const [fundraisers, setFundraisers] = useState({});
  const [allFundraisers, setAllFundraisers] = useState({});
  const [mainFundraiser, setMainFundraiser] = useState();
  const [featuredFundraisers, setFeaturedFundraisers] = useState([]);
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
      let res = await axios.get("/api/v1/catalogue/fundraisers/");
      let data = await res.data;
      setAllFundraisers(data);
      setMainFundraiser(data[0]);
      setFeaturedFundraisers(data.slice(1, 3));
      setFundraisers(groupBy(data.slice(3), "category"));
      setLoading(false);
    };
    dispatch(verifyTokenAsync());
    fetchData().catch(console.error);
  }, []);

  if (verifyStatus === "start" || loading) {
    return <Spinner open={true} />;
  }

  return (
    <Suspense fallback={null}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item md={12}>
          <Header />
        </Grid>
        <Grid item md={12}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  fundraisers={fundraisers}
                  mainFundraiser={mainFundraiser}
                  featuredFundraisers={featuredFundraisers}
                />
              }
            />
            <Route
              exact
              path="/home"
              element={
                <Home
                  fundraisers={fundraisers}
                  mainFundraiser={mainFundraiser}
                  featuredFundraisers={featuredFundraisers}
                />
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/contact-us" element={<ContactUs />} />
            {allFundraisers.map((fundraiser) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <Route
                    key={uuidv4()}
                    exact
                    path={`/fundraisers/${fundraiser.slug}`}
                    element={<Fundraiser fundraiser={fundraiser} />}
                  />
                  <Route element={<PrivateRoute auth={isAuthenticated} />}>
                    <Route
                      key={uuidv4()}
                      exact
                      path={`checkout/${fundraiser.slug}/`}
                      element={<Checkout fundraiser={fundraiser} />}
                    />
                  </Route>
                </React.Fragment>
              );
            })}
            <Route
              exact
              path="/discover"
              element={<Discover data={allFundraisers} />}
            />
            <Route element={<PrivateRoute auth={isAuthenticated} />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute auth={isAuthenticated} />}>
              <Route exact path="/account" element={<Account />} />
            </Route>
            <Route element={<PrivateRoute auth={isAuthenticated} />}>
              <Route exact path="/start-fundraiser" element={<Account />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Grid>
        <Grid item md={12}>
          <Footer />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Router;
