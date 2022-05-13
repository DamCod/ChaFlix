import Movies from "../components/Movies/Movies";
import { useState, useEffect } from "react";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import InfiniteScroll from "../components/InfiniteScroll";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

function FilterByRating() {
  const [rating, setRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      tmdbApiConfig.params["vote_average.gte"] = rating * 2 - 0.99;
      tmdbApiConfig.params.page = page;
      const { data } = await axios.get("/discover/movie", tmdbApiConfig);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    };
    rating && getMovies();
  }, [rating, page]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  const handleRating = (event, newValue) => {
    if (event.type === "click") {
      setMovies([]);
      setRating(0);
    } else {
      setRating(newValue);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <StyledRating
            className="my-4"
            size="large"
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => handleRating(event, newValue)}
          />
        </div>
        <div className="container mt-3">
          <div className="row g-4">
            <Movies movies={movies} rating={rating} />
          </div>
        </div>
      </div>
      <InfiniteScroll setPage={setPage} page={page} />
    </>
  );
}

export default FilterByRating;
