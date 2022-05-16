import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../features/home/Home";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Checkout from "../features/checkout/Checkout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Login from "./features/auth/Login";
// import Error from "./pages/Error";
// import { useSelector } from "react-redux";
// import { Container } from "react-bootstrap";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { verifyTokenAsync } from "./features/auth/asyncActions";

// function App() {
//   const { isAuthenticated, verifyStatus } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(verifyTokenAsync());
//   }, []);

//   if (verifyStatus === "loading") {
//     return (
//       <Container>
//         <Container className="mx-auto">Checking authentication</Container>
//       </Container>
//     );
//   }
