import React, { useEffect, useState } from "react";
import "./ScrollToTopBtn.css";

function ScrollToTopBtn() {
  const [scrollBtn, setScrollBtn] = useState(false);

  const showScrollBtn = () => {
    if (window.scrollY >= 1000) {
      setScrollBtn(true);
    } else {
      setScrollBtn(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", showScrollBtn);
  });

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <button
      onClick={() => scrollToTop()}
      className={`btn btn-danger scroll-btn rounded-circle fs-2 ${
        scrollBtn ? "d-inline-block" : "d-none"
      }`}
    >
      ↥
    </button>
  );
}

export default ScrollToTopBtn;
