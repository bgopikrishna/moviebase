import React, { useState, Fragment } from "react";
import Loader from "./Loader";

//YT iframe is component which renders the Youtube Iframe
const YTIFrame = ({ src }) => {
  //hook to find iframe loaded or not
  const [iframeLoaded, setiframeLoaded] = useState(false);

  return (
    <Fragment>
      {!iframeLoaded && <Loader />}
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
