import "./Header.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ movies }) {
  return (
    <header className="w-100">
      <Carousel fade indicators={false} controls={false} interval={10000}>
        {movies.length > 0 &&
          movies.map(
            (movie, i) =>
              i <= 5 && (
                <Carousel.Item className="carousel" key={i}>
                  <div className="gradient w-100 h-100"></div>
                  <img
                    className="d-block w-100 img-fluid"
                    src={`https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{movies[i].title}</h3>
                    <p>{movies[i].overview}</p>
                    <Link to={`/movies/${movies[i].id}`}>
                      <button className="btn btn-danger">+ Info</button>
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
