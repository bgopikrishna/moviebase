import React from "react";

//A loader component for showing loading screen

const loaderStyle = {
  color: "white",
  minHeight: "50vh",
  fontSize: "48px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%"
};

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <i className="fab fa-cloudscale fa-spin" />
      <span style={{ fontSize: "18px", marginTop: "20px" }}>Loading ...</span>
    </div>
  );
};

export default Loader;
