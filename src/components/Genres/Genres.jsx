import "./Genres.css";
import tmdbApiConfig from "../../tmdbApiConfig";
import axios from "axios";

function Genres({ setMovies }) {
  const handleGenres = (genre) => {
    const getMovies = async () => {
      tmdbApiConfig.params.with_genres = genre;
      const { data } = await axios.get("/discover/movie", tmdbApiConfig);
      setMovies(data.results);
    };
    getMovies();
  };
  return (
    <div className="col-12 my-5 px-0">
      <button
        onClick={() => {
          handleGenres(28);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Action
      </button>
      <button
        onClick={() => {
          handleGenres(12);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Adventure
      </button>
      <button
        onClick={() => {
          handleGenres(16);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Animation
      </button>
      <button
        onClick={() => {
          handleGenres(35);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Comedy
      </button>
      <button
        onClick={() => {
          handleGenres(80);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Crime
      </button>
      <button
        onClick={() => {
          handleGenres(99);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Documentary
      </button>
      <button
        onClick={() => {
          handleGenres(18);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Drama
      </button>
      <button
        onClick={() => {
          handleGenres(10751);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Family
      </button>
      <button
        onClick={() => {
          handleGenres(14);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Fantasy
      </button>
      <button
        onClick={() => {
          handleGenres(36);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        History
      </button>
      <button
        onClick={() => {
          handleGenres(27);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Horror
      </button>
      <button
        onClick={() => {
          handleGenres(10402);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Music
      </button>
      <button
        onClick={() => {
          handleGenres(9648);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Mystery
      </button>
      <button
        onClick={() => {
          handleGenres(10749);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Romance
      </button>
      <button
        onClick={() => {
          handleGenres(878);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Science Fiction
      </button>
      <button
        onClick={() => {
          handleGenres(53);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Thriller
      </button>
      <button
        onClick={() => {
          handleGenres(10752);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        War
      </button>
      <button
        onClick={() => {
          handleGenres(10770);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        TV Movies
      </button>
      <button
        onClick={() => {
          handleGenres(37);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Western
      </button>
    </div>
  );
}

export default Genres;
