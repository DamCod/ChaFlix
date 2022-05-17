import React from "react";

function CustomRightArrow({ onClick, ...rest }) {
  const {
    onMove,
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
