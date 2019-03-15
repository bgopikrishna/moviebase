import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        color: "white",
        minHeight: "50vh",
        fontSize: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center"
      }}
    >
      <i className="fab fa-cloudscale fa-spin" />
      <span
        style={{ fontSize: "18px", marginTop: "20px" }}
      >
        Loading ...
      </span>
    </div>
  );
};

export default Loader;
