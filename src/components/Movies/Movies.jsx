import "./Movies.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

function Movies({ movies, title }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {movies.length === 0 && title ? (
        <p className="text-white">No se encontró película</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="col-4 movies">
            {isLoading && (
              <div className="d-flex justify-content-center align-items-center no-image loading-image rounded shadow">
                <Spinner animation="border" variant="danger" />
              </div>
            )}
            <Link
              to={`/movies/${movie.id}`}
              className={`${isLoading && "d-none"} text-decoration-none`}
            >
              {movie.poster_path ? (
                <img
                  className="rounded shadow img-fluid movie-poster w-100 h-100"
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="no-image bg-secondary d-flex align-items-center justify-content-center text-white rounded shadow">
                  <p className="fs-4">{movie.title}</p>
                </div>
              )}
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default Movies;
