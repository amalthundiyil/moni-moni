import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../features/home/Home";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
