import React from "react";
import { Link } from "react-router-dom";

const NoPage404 = () => {
  return (
    <div style={{ margin: "100px auto", textAlign: "center" }}>
      <p> Shhh... You Hit the Wrong Route</p>
      <p>or</p>
      <p>This page may not done yet or maybe I'm currently working on it</p>

      <p>
        Go to {" "}
        <Link to="/" style={{ textDecoration: "underline" }}>
          Home
        </Link>
      </p>
      <br />
    </div>
  );
};

export default NoPage404;
