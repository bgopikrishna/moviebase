import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="app">
      {/* Navigation Bar */}
      <Navbar />

      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
