import "./Header.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ movies }) {
  return (
    <header className="w-100">
      <Carousel fade indicators={false} controls={false} interval={5000}>
        {movies.length > 0 &&
          movies.map(
            (movie, i) =>
              i <= 10 && (
                <Carousel.Item className="carousel" key={i}>
                  <div className="gradient w-100 h-100"></div>
                  <img
                    className="header-img d-block w-100 img-fluid"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="First slide"
                  />
                  <Carousel.Caption className="animate__animated animate__fadeInDown">
                    {movies[i].title.includes(":") ? (
                      <>
                        <h4 className="movie-title">
                          {movie.title.split(":")[0]}:
                        </h4>
                        <h4 className="movie-subtitle">
                          {movie.title.split(":")[1]}
                        </h4>
                      </>
                    ) : (
                      <h4 className="movie-title">{movies[i].title}</h4>
                    )}
                    <p className="fs-5">{movies[i].overview}</p>
                    <Link to={`/movies/${movies[i].id}`}>
                      <button className="more-info-btn btn btn-danger">
                        More Info
                      </button>
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              )
          )}
      </Carousel>
    </header>
  );
}

export default Header;
