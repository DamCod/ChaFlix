import "./Movie.css";
import axios from "axios";
import tmdbApiConfig from "../tmdbApiConfig";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "react-bootstrap";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function Movie() {
  const [movie, setMovie] = useState([]);
  const params = useParams();
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(`/movie/${params.id}`, tmdbApiConfig);
      const response = await axios.get(
        `/movie/${params.id}/credits`,
        tmdbApiConfig
      );
      setMovie(data);
      console.log(data);
      console.log(response.data.crew);
      setCast(response.data.cast);
      setDirector(response.data.crew.filter((crew) => crew.job === "Director"));
      setWriter(
        response.data.crew.filter(
          (crew) => crew.job === "Writer" || crew.job === "Screenplay"
        )
      );
    };
    getMovie();
  }, [params.id]);
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
  });

  const styles = {
    h1: {
      fontSize: "5rem",
      lineHeight: 1,
    },

    castImg: {
      width: "218px",
      height: "290px",
      objectFit: "cover",
    },

    cardBody: {
      heigth: "500px",
    },
  };

  function movieRuntime(movieDurationInMin) {
    const m = movieDurationInMin % 60;
    const h = (movieDurationInMin - m) / 60;
    const HHMM = h.toString() + "h " + (m < 10 ? "0" : "") + m.toString() + "m";
    return HHMM;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <div className="row align-items-center pt-5 px-5 movie-details position-relative mt-5">
            <div className="col-3 poster-img-container position-relative p-0">
              <img
                className="poster-img img-fluid rounded-3 w-100 h-100"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div
                onClick={handleShow}
                className="poster-expand rounded w-100 h-100"
              >
                <span>
                  <i class="bi bi-zoom-in"></i>Expand
                </span>
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <h1 className="text-start fs-2" style={styles.h1}>
                    {movie.title}{" "}
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
        <div className="mt-5 px-5">
          <h3 className="text-start mb-3 fs-2">Cast</h3>
          {cast && (
            <Carousel
              swipeable={true}
              draggable={true}
              autoPlaySpeed={100000000}
              ssr={false}
              infinite={true}
              responsive={responsive}
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              partialVisible={true}
            >
              {cast.map(
                (cast, i) =>
                  i <= 10 && (
                    <div
                      key={cast.name}
                      className="cast-card w-100 text-white pb-4 rounded-3 border border-danger shadow"
                      style={styles.cardBody}
                    >
                      {cast.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                          className="card-img-top img-fluid w-100"
                          alt={cast.name}
                          style={styles.castImg}
                        />
                      ) : (
                        <div
                          className="bg-secondary d-flex justify-content-center align-items-center w-100 rounded-top"
                          style={styles.castImg}
                        >
                          <p className="text-white">No image available</p>
                        </div>
                      )}
                      <div className="cast-card-body p-2">
                        <h5 className="cast-card-title">{cast.name}</h5>
                        <p>{cast.character}</p>
                      </div>
                    </div>
                  )
              )}
            </Carousel>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          className="bg-dark text-white"
          closeButton
          closeVariant="white"
        >
          <Modal.Title>
            <h1 className="text-start fs-2" style={styles.h1}>
              {movie.title}{" "}
              <span className="year">
                (
                {Object.keys(movie).length > 0 &&
                  movie.release_date.slice(0, 4)}
                )
              </span>
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0">
          <img
            onClick={handleShow}
            className="img-fluid rounded-3"
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
