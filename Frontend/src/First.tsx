import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

const First = () => {
  return (
<>
  <ScrollToTop />
  <Header />
  <Outlet />
  <Footer />
</>
  );
};

export default First;