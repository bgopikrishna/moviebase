import React from "react";
import EmojiHolder from "./EmojiHolder";
import PropTypes from "prop-types";

/** 
  * A component which is used for displying errors in our app, 
  * like when fetching data, search results etc
  * takes `errorMsg` {string} and `refresh` {bool} (optional) as props
  * `errorMsg` is the error message needs to be showed
  * `refresh` is to show page refresh button if needed
  */

const errDisplayStyle = {
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

/*
  The component takes `errormessage` as the prop to display the error.
  The second prop is `refresh` (optional prop) which displays reload button to refresh the page
*/

const ErrorDisplay = ({ errorMsg, refresh }) => {
  return (
    <div style={errDisplayStyle}>
      <p>
        <EmojiHolder emoji={"🤕"} label={"Face With Head-Bandage"} />
        Ahhh... Something went wrong
      </p>
      <p>
        <EmojiHolder emoji={"⚠️"} label={"Warning"} />
        {/**Erorr Message Display */}
        Error Message: {errorMsg}
      </p>

      {refresh && (
        <button onClick={() => window.location.reload()}>Reload The App</button>
      )}
    </div>
  );
};

//Default Props
ErrorDisplay.defaultProps = {
  errorMsg: "Some Thing Went Wrong",
  refresh: false
};

//Type Checking
ErrorDisplay.propTypes = {
  errorMsg: PropTypes.string
};

export default ErrorDisplay;
