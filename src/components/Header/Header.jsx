import "./Header.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ movies }) {
  return (
    movies.length > 0 && (
      <header className="w-100">
        <Carousel fade indicators={false} controls={false} interval={10000}>
          <Carousel.Item className="carousel">
            <div className="gradient w-100 h-100"></div>
            <img
              className="d-block w-100 img-fluid"
              src={`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`}
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="caption-div">
                <h3>{movies[0].title}</h3>
                <p>{movies[0].overview}</p>
                <Link to={`/movies/${movies[0].id}`}>
                  <button className="btn btn-danger">+ Info</button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel">
            <div className="gradient w-100 h-100"></div>
            <img
              className="d-block w-100 img-fluid"
              src={`https://image.tmdb.org/t/p/original${movies[1].backdrop_path}`}
              alt="Second slide"
            />

            <Carousel.Caption>
              <div className="caption-div">
                <h3>{movies[1].title}</h3>
                <p>{movies[1].overview}</p>
                <Link to={`/movies/${movies[1].id}`}>
                  <button className="btn btn-danger my-2">+ Info</button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel">
            <div className="gradient w-100 h-100"></div>
            <img
              className="d-block w-100 img-fluid"
              src={`https://image.tmdb.org/t/p/original${movies[7].backdrop_path}`}
              alt="Third slide"
            />

            <Carousel.Caption className="caption">
              <div className="caption-div">
                <h3>{movies[7].title}</h3>
                <p>{movies[7].overview}</p>
                <Link to={`/movies/${movies[7].id}`}>
                  <button className="btn btn-danger">+ Info</button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>
    )
  );
}

export default Header;
