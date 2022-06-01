import "./RecommendedMovies.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function RecommendedMovies({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const recommendations = await axios.get(
        `/movie/${movieId}/similar`,
        tmdbApiConfig
      );
      console.log(recommendations.data.results);
      setRecommendedMovies(recommendations.data.results);
    };
    getRecommendations();
  }, [movieId]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  return (
    <>
      <h3 className="mb-3 fs-3">Recommendations</h3>
      <div className="recommendations scroll px-3 rounded-3">
        {recommendedMovies.map(
          (movie, i) =>
            i <= 5 && (
              <Link
                key={i}
                to={`/movies/${movie.id}`}
                className="text-decoration-none"
              >
                <div className="recommendation-container my-3">
                  <div className="recommendation-title">
                    <p>
                      {movie.title}
                      <span className="ps-1 text-white">
                        (
                        {Object.keys(movie).length > 0 &&
                          movie.release_date.slice(0, 4)}
                        )
                      </span>
                    </p>
                    <div className="recommendation-rating">
                      <StyledRating
                        readOnly
                        size="small"
                        name="simple-controlled"
                        value={Math.round(movie.vote_average / 2)}
                      />
                    </div>
                  </div>

                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.original_title}
                    className="rounded w-100 h-100"
                  />
                </div>
              </Link>
            )
        )}
      </div>
    </>
  );
}

export default RecommendedMovies;
