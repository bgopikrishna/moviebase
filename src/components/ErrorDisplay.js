import React from "react";
import EmojiHolder from "./EmojiHolder";
import PropTypes from "prop-types";

//A component which is used for displying errors in our app, like when fetching data etc

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

//The component takes error message as the prop to display the error

const ErrorDisplay = ({ errorMsg }) => {
  return (
    <div style={divStyle}>
      <p>
        <EmojiHolder emoji={"🤕"} label={"Face With Head-Bandage"} />
        Ahhh... Something went wrong
      </p>
      <p>
        <EmojiHolder emoji={" ⚠️"} label={"Warning"} />
        {/**Erorr Message Display */}
        Error Message: {errorMsg}
      </p>
      <p>
        <EmojiHolder emoji={"🧐"} label={"Face With Monocle"} />
        Tip: Please Check Your Internet Connection & Try Again Later
      </p>
    </div>
  );
};

//Default Props for the comp
ErrorDisplay.defaultProps = {
  errorMsg: "Some Thing Went Wrong"
};

//Type Checking
ErrorDisplay.propTypes = {
  errorMsg: PropTypes.string
};

export default ErrorDisplay;
