import React from "react";
import { Link } from "react-router-dom";

const NoPage404 = () => {
  return (
    <div style={{ margin: "100px auto", textAlign: "center" }}>
      Shhh... This page is not done yet <br />
      Go to{" "}
      <Link to="/" style={{ textDecoration: "underline" }}>
        Home
      </Link>
      <br />
    </div>
  );
};

export default NoPage404;
