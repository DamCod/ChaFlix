import { useEffect } from "react";

function InfiniteScroll({ setPage, page }) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        page <= 10 &&
        window.innerHeight + Math.ceil(window.pageYOffset) >=
          document.body.offsetHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return <></>;
}

export default InfiniteScroll;
