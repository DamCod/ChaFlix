import React from "react";

function CustomRightArrow({ onClick, ...rest }) {
  const {
    // eslint-disable-next-line
    onMove,
    // eslint-disable-next-line
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <button
      onClick={() => onClick()}
      className="carousel-arrow carousel-arrow-right position-absolute h-100"
    >
      ›
    </button>
  );
}

export default CustomRightArrow;
