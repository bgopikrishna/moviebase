import React from "react";
import { placeholderImage } from "../helperfunctions/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./StackedImageCard.scss";

const StackedImageCard = ({
  image,
  altForImage,
  cardHeader,
  cardFooter,
  linkTo
}) => {
  const cardImage = (
    <img
      className=" card-image"
      src={
        image
          ? `https://image.tmdb.org/t/p/w138_and_h175_face${image}`
          : placeholderImage(altForImage)
      }
      alt={altForImage}
    />
  );

  return (
    <div className="cast-member-card stacked-card">
      {linkTo ? <Link to={linkTo}>{cardImage}</Link> : cardImage}
      <div className=" card-content">
        <h4 className="card-header">
          {linkTo ? <Link to={linkTo}>{cardHeader}</Link> : cardHeader}
        </h4>
        <span className="card-footer">{cardFooter}</span>
      </div>
    </div>
  );
};

export default StackedImageCard;

StackedImageCard.propTypes = {
  image: PropTypes.string,
  altForImage: PropTypes.string,
  cardHeader: PropTypes.string,
  cardFooter: PropTypes.string
};
