import "./Movie.css";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Modal } from "react-bootstrap";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";
import Reviews from "../components/Reviews/Reviews";
import Cast from "../components/Cast/Cast";
import RecommendedMovies from "../components/RecommendedMovies/RecommendedMovies";

function Movie() {
  const [movie, setMovie] = useState([]);
  const params = useParams();
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(`/movie/${params.id}`, tmdbApiConfig);
      setMovie(data);
    };
    getMovie();
  }, [params.id]);
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  function movieRuntime(movieDurationInMin) {
    const m = movieDurationInMin % 60;
    const h = (movieDurationInMin - m) / 60;
    const HHMM = h.toString() + "h " + (m < 10 ? "0" : "") + m.toString() + "m";
    return HHMM;
  }

  const [zoom, setZoom] = useState(false);
  const handleClose = () => {
    setZoom(false);
  };

  return (
    <>
      <div className="container-fluid movie-page-container text-white p-0">
        <div className="header-movie position-relative">
          <div className="header-gradient w-100 h-100 position-absolute"></div>
          <img
            className="header-bg-img img-fluid w-100 h-100"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="background-image"
          />
          <div className="row align-items-center pt-5 px-4 mx-4 movie-details position-relative mt-5 gx-5">
            <div className="col-3 poster-img-container position-relative p-0">
              <img
                className="poster-img img-fluid rounded-3 w-100 h-100"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div
                onClick={() => setZoom(true)}
                className="poster-expand rounded w-100 h-100"
              >
                <span className="fs-4">
                  <i className="bi bi-arrows-fullscreen"></i> Expand
                </span>
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <h1 className="title text-start fs-2">
                    <strong>{movie.title}</strong>{" "}
                    <span className="year">
                      (
                      {Object.keys(movie).length > 0 &&
                        movie.release_date.slice(0, 4)}
                      )
                    </span>
                  </h1>
                </div>
                <div className="d-flex align-items-center facts text-start">
                  <span className="release">
                    {Object.keys(movie).length > 0 &&
                      movie.release_date.replace(/-/g, "/") +
                        " " +
                        "(" +
                        Object.values(movie.production_countries[0])[0] +
                        ")"}
                  </span>
                  <span className="genres">
                    {Object.keys(movie).length > 0 &&
                      movie.genres.map((genre, i) =>
                        i > 0 ? ", " + genre.name : genre.name
                      )}
                  </span>
                  <span className="runtime">{movieRuntime(movie.runtime)}</span>
                </div>
                <div className="d-flex align-items-center">
                  <StyledRating
                    readOnly
                    className="my-4 me-2"
                    size="large"
                    name="simple-controlled"
                    value={Math.round(movie.vote_average / 2)}
                  />
                  <span className="me-3 fs-5">{movie.vote_average}/10</span>
                  <button className="btn btn-danger circle-button">
                    <i className="bi bi-list-ul"></i>
                  </button>
                  <button className="btn btn-danger circle-button">
                    <i className="bi bi-heart-fill"></i>
                  </button>
                  <button className="btn btn-danger circle-button">
                    <i className="bi bi-bookmark-fill"></i>
                  </button>
                  <button className="btn btn-danger circle-button">
                    <i className="bi bi-star-fill"></i>
                  </button>
                </div>
              </div>
              <p className="text-start tagline">{movie.tagline}</p>
              <h3 className="fs-5 text-start">
                <strong>Overview</strong>
              </h3>
              <p className="fs-5 text-start">{movie.overview}</p>
              <div className="d-flex">
                <div>
                  <p className="text-start mt-3 pe-5 me-5">
                    <strong>
                      {director.length > 0 && director[0].original_name}
                    </strong>
                    <br />
                    Director
                  </p>
                </div>
                <div>
                  <p className="text-start mt-3 ms-5">
                    <strong>
                      {writer.length > 0 && writer[0].original_name}
                    </strong>
                    <br />
                    Writer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Cast
          movieId={params.id}
          setWriter={setWriter}
          setDirector={setDirector}
        />
        <Reviews movieId={params.id} />
        <RecommendedMovies movieId={params.id} />
      </div>

      <Modal show={zoom} onHide={handleClose} centered>
        <Modal.Header
          className="bg-dark text-white border-secondary"
          closeButton
          closeVariant="white"
        >
          <Modal.Title>
            <h2 className="title text-start fs-2">
              {movie.title}{" "}
              <span className="year">
                (
                {Object.keys(movie).length > 0 &&
                  movie.release_date.slice(0, 4)}
                )
              </span>
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0">
          <img
            onClick={() => setZoom(true)}
            className="img-fluid rounded-bottom"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </Modal.Body>
      </Modal>

      <ScrollToTopBtn />
    </>
  );
}

export default Movie;
