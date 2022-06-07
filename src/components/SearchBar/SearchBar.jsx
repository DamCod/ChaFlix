import axios from "axios";
import { useState } from "react";
import tmdbApiConfig from "../../tmdbApiConfig";

function SearchBar({ setMovies }) {
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

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

  return (
    <>
      <form className="p-3" onSubmit={() => getMovies()}>
        <div class="input-group">
          <input
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
              setPage(1);
            }}
            type="text"
            className="search-bar form-control bg-dark text-white"
            id="searchInput"
            placeholder="Search movie..."
          />
          <button className="btn btn-outline-danger">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-search"
              viewBox="0 0 16 16"
              stroke="white"
              strokeWidth="1"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
