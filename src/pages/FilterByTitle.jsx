import Movies from "../components/Movies/Movies";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import InfiniteScroll from "../components/InfiniteScroll";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";

function FilterByTitle({ title }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  useEffect(() => {
    title === "" && navigate("/");
    const getMovies = async () => {
      tmdbApiConfig.params.query = title;
      tmdbApiConfig.params.page = page;
      const { data } = await axios.get("/search/movie", tmdbApiConfig);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    };
    title && getMovies();
    // eslint-disable-next-line
  }, [title, page]);

  return (
    <>
      <div className="container-fluid px-5 mt-5">
        <div className="row justify-content-center pt-5">
          {title ? (
            <div className="row g-2 justify-content-center mt-4">
              <Movies movies={movies} title={title} />
            </div>
          ) : (
            <p className="text-white">Search movies by title</p>
          )}
        </div>
      </div>
      <ScrollToTopBtn />
      <InfiniteScroll setPage={setPage} page={page} />
    </>
  );
}

export default FilterByTitle;
