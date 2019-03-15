import React from "react";
import EmojiHolder from "./EmojiHolder";

const divStyle = {
  color: "white",
  gridColumn: "span 2",
  minHeight: "50vh",
  fontSize: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "capitalize"
};

const ErrorDisplay = ({ errorMsg = "Failed To Fetch" }) => {
  return (
    <div style={divStyle}>
      <p>
        <EmojiHolder emoji={"🤕"} label={"Face With Head-Bandage"} />
        Ahhh... Something went wrong
      </p>
      <p>
        <EmojiHolder emoji={" ⚠️"} label={"Warning"} />
        Error Message: {errorMsg}
      </p>
      <p>
        <EmojiHolder emoji={"🧐"} label={"Face With Monocle"} />
        Please Check Your Internet Connection & Try Again Later
      </p>
    </div>
  );
};

export default ErrorDisplay;
