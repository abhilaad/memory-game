import React from "react";
import classnames from "classnames";
import defaultpic from "./images/defaultpic.jpg";
import "./card.css";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={defaultpic} alt="defaultpic" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="defaultpic" />
      </div>
    </div>
  );
};

export default Card;
