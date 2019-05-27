import React, { useState, Fragment } from "react";
import Loader from "./Loader";
import PropTypes from "prop-types";

/**
 * YT iframe is a component, which renders the Youtube Iframe.
 * It takes iframe `src` {string} as the prop
 */

const YTIFrame = ({ src }) => {
  //hook to find iframe loaded or not
  const [iframeLoaded, setiframeLoaded] = useState(false);

  return (
    <Fragment>
      {!iframeLoaded && <Loader />} {/* Display Loade till iframe loads*/}
      {/* Hide iframe till iframe complete load*/}
      <iframe
        className="iframe-yt"
        style={iframeLoaded ? { display: "block" } : { display: "none" }}
        title="Trailer"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => {
          setiframeLoaded(true); //On Successfull load set the Loader to False
        }}
      />
    </Fragment>
  );
};

export default YTIFrame;

//Type Checking
YTIFrame.propTypes = {
  src: PropTypes.string.isRequired
};
