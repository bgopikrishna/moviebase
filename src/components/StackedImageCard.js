import React from "react";
import { placeholderImage } from "../helperfunctions/helpers";

const StackedImageCard = ({ image, altForImage, cardHeader, cardFooter }) => {
  return (
    <div className="cast-member-card stacked-card">
      <img
        className="cast-member-image card-image"
        src={
          image
            ? `https://image.tmdb.org/t/p/w138_and_h175_face${image}`
            : placeholderImage("No Image")
        }
        alt={altForImage}
      />
      <div className="cast-names card-content">
        <h4 className="cast-member-name card-header">{cardHeader}</h4>
        <span className="cast-member-role card-footer">{cardFooter}</span>
      </div>
    </div>
  );
};

export default StackedImageCard;
