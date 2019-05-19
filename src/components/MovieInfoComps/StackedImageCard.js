import React from "react";
import { placeholderImage } from "../../helperfunctions/helpers";
import PropTypes from "prop-types";
import "./StackedImageCard.scss";
import WithLink from "../extras/WithLink";

const StackedImageCard = ({
  image,
  altForImage,
  cardHeader,
  cardFooter,
  linkTo,
  externalLink
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
      {linkTo ? (
        <WithLink to={linkTo} externalLink={externalLink}>
          {cardImage}
        </WithLink>
      ) : (
        cardImage
      )}
      <div className=" card-content">
        <h4 className="card-header">
          {linkTo ? (
            <WithLink to={linkTo} externalLink={externalLink}>
              {cardHeader}
            </WithLink>
          ) : (
            cardHeader
          )}
        </h4>
        <span className="card-footer">{cardFooter}</span>
      </div>
    </div>
  );
};

export default StackedImageCard;

StackedImageCard.defaultProps = {
  externalLink: false
};

StackedImageCard.propTypes = {
  image: PropTypes.string,
  altForImage: PropTypes.string,
  cardHeader: PropTypes.string,
  cardFooter: PropTypes.string,
  externalLink: PropTypes.bool
};
