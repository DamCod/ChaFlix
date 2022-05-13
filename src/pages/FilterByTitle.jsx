import Movies from "../components/Movies/Movies";
import { useState, useEffect } from "react";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import InfiniteScroll from "../components/InfiniteScroll";

function FilterByTitle() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
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
  }, [title, page]);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="my-5 d-flex justify-content-center">
            <form className="w-25">
              <label
                htmlFor="searchInput"
                className="form-label fs-5 fw-bold text-white visually-hidden"
              >
                Escribe el título de la película
              </label>
              <input
                value={title}
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setPage(1);
                }}
                type="text"
                className="form-control bg-dark text-white"
                id="searchInput"
                placeholder="Escribe el título de la película..."
              />
            </form>
          </div>
          {title ? (
            <div className="row justify-content-center mt-4 g-4">
              <Movies movies={movies} title={title} />
            </div>
          ) : (
            <p className="text-white">Search movies by title</p>
          )}
        </div>
      </div>
      <InfiniteScroll setPage={setPage} page={page} />
    </>
  );
}

export default FilterByTitle;
