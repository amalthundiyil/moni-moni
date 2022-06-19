import { Suspense } from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import Home from "../features/home/Home";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Pricing from "../features/fundraiser/Pricing";
import Checkout from "../features/checkout";
import { verifyTokenAsync } from "../features/auth/asyncActions";
import PrivateRoute from "./PrivateRoute";
import Fundraiser from "../features/fundraiser";
import { useGlobalContext } from "../context";
import { groupBy } from "lodash";
import axios from "../utils/axios";
import { v4 as uuidv4 } from "uuid";

const Router = () => {
  const { isAuthenticated, verifyStatus } = useSelector((state) => state.auth);
  const { loading, setLoading } = useGlobalContext();
  const [fundraisers, setFundraisers] = useState({});
  const [allFundraisers, setAllFundraisers] = useState({});
  const [mainFundraiser, setMainFundraiser] = useState();
  const [featuredFundraisers, setFeaturedFundraisers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await axios.get("/api/v1/catalogue/fundraisers/");
      let data = await res.data;
      setAllFundraisers(data);
      setMainFundraiser(data[0]);
      setFeaturedFundraisers(data.slice(1, 3));
      setFundraisers(groupBy(data, "category"));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  if (verifyStatus === "start" || loading) {
    return <Spinner open={true} />;
  }

  return (
    <Suspense fallback={null}>
      <Header />
      <Routes>
        <Route
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route
          exact
          path="/"
          element={<PrivateRoute auth={isAuthenticated} v={verifyStatus} />}
        >
          <Route path="/checkout" element={<Checkout />} />
        </Route> */}
        {allFundraisers.map((fundraiser) => {
          return (
            <React.Fragment key={uuidv4()}>
              <Route
                key={uuidv4()}
                path={`/fundraisers/${fundraiser.slug}`}
                element={<Fundraiser fundraiser={fundraiser} />}
              />
              <Route
                key={uuidv4()}
                path={`/fundraisers/${fundraiser.slug}/pricing`}
                element={<Pricing fundraiser={fundraiser} />}
              />
              <Route
                key={uuidv4()}
                path={`/${fundraiser.slug}/checkout`}
                element={<Checkout fundraiser={fundraiser} />}
              />
            </React.Fragment>
          );
        })}
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
