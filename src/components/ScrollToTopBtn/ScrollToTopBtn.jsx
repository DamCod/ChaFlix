import React from "react";
import "./ScrollToTopBtn.css";

function ScrollToTopBtn() {
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <button
      onClick={() => scrollToTop()}
      className="btn btn-danger scroll-btn rounded-circle fs-2"
    >
      ↥
    </button>
  );
}

export default ScrollToTopBtn;
