import "./RecommendedMovies.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Carousel from "react-multi-carousel";
import CustomRightArrow from "../CustomArrows/CustomRightArrow";
import CustomLeftArrow from "../CustomArrows/CustomLeftArrow";

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
      <h3 className="mb-3 fs-4 text-md-center text-start">Recommendations</h3>
      <Slide direction="right" triggerOnce={true}>
        <div className="recommendations-lg scroll px-3 rounded-3">
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

        <Carousel
          swipeable={true}
          arrows={true}
          autoPlay={false}
          infinite={true}
          shouldResetAutoplay={false}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 6,
              slidesToSlide: 1,
            },
            desktop2: {
              breakpoint: { max: 1530, min: 1024 },
              items: 5,
              slidesToSlide: 1,
            },
            desktop3: {
              breakpoint: { max: 1300, min: 1024 },
              items: 4,
              slidesToSlide: 1,
            },
            tablet: {
              breakpoint: { max: 1040, min: 464 },
              items: 3,
              slidesToSlide: 1,
            },
            mobile2: {
              breakpoint: { max: 780, min: 0 },
              items: 2,
              slidesToSlide: 1,
            },
          }}
          keyBoardControl={true}
          containerClass="carousel-container recommendations-sm py-3 rounded"
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          itemClass="px-3"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {recommendedMovies
            .filter((movie) => movie.title)
            .map((movie, i) => (
              <Link
                key={i}
                to={`/movies/${movie.id}`}
                className="text-decoration-none"
              >
                <div className="w-100 text-white rounded-3 shadow">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded w-100 h-100"
                    />
                  ) : (
                    <div className="no-image-recommended py-3 d-flex align-items-center justify-content-center rounded shadow">
                      <h5 className="notflix-logo text-danger">
                        <strong>N</strong>
                      </h5>
                      <p>{movie.title}</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </Carousel>
      </Slide>
    </>
  );
}

export default RecommendedMovies;
