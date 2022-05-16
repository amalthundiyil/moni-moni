import { Suspense } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import Home from "../features/home/Home";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Checkout from "../features/checkout/Checkout";
import { verifyTokenAsync } from "../features/auth/asyncActions";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const { isAuthenticated, verifyStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(isAuthenticated);
  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, []);

  return (
    <Suspense fallback={null}>
      {verifyStatus === "loading" && <Spinner open={true} />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route exact path="/" element={<PrivateRoute auth={isAuthenticated} />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
