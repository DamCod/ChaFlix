import "./RecommendedMovies.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

function RecommendedMovies({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const recommendations = await axios.get(
        `/movie/${movieId}/recommendations`,
        tmdbApiConfig
      );
      if (recommendations.data.results.length < 5) {
        const getRecommendations = async () => {
          const recommendations = await axios.get(
            `/movie/${movieId}/similar`,
            tmdbApiConfig
          );
          setRecommendedMovies(recommendations.data.results);
        };
        getRecommendations();
      }
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
      <h3 className="mb-3 fs-4">Recommendations</h3>
      <Slide direction="right" triggerOnce={true}>
        <div className="recommendations scroll px-3 rounded-3">
          {recommendedMovies
            .filter((movie) => movie.title)
            .map(
              (movie, i) =>
                i <= 6 && (
                  <Link
                    key={i}
                    to={`/movies/${movie.id}`}
                    className="text-decoration-none"
                  >
                    <div className="recommendation-container my-3">
                      <div className="recommendation-title">
                        <h6>
                          {movie.title}
                          <span className="ps-1 text-white">
                            (
                            {Object.keys(movie).length > 0 &&
                              movie.release_date.slice(0, 4)}
                            )
                          </span>
                        </h6>
                        <div className="recommendation-rating">
                          <StyledRating
                            readOnly
                            size="small"
                            name="simple-controlled"
                            value={Math.round(movie.vote_average / 2)}
                          />
                          <p className="recommendation-overview fs-6">
                            {movie.overview.substr(0, 80)}...
                          </p>
                        </div>
                      </div>

                      {movie.backdrop_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          alt={movie.title}
                          className="rounded w-100 h-100"
                        />
                      ) : (
                        <div className="no-image-recommended py-3 d-flex align-items-center justify-content-center rounded shadow">
                          <h5 className="notflix-logo text-danger">
                            <strong>N</strong>
                          </h5>
                        </div>
                      )}
                    </div>
                  </Link>
                )
            )}
        </div>
      </Slide>
    </>
  );
}

export default RecommendedMovies;
