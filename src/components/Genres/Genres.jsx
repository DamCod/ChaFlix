import "./Genres.css";
import tmdbApiConfig from "../../tmdbApiConfig";
import axios from "axios";

function Genres({ setGenre, setMovies }) {
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
          setGenre(28);
          handleGenres(28);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Action
      </button>
      <button
        onClick={() => {
          setGenre(12);
          handleGenres(12);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Adventure
      </button>
      <button
        onClick={() => {
          setGenre(16);
          handleGenres(16);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Animation
      </button>
      <button
        onClick={() => {
          setGenre(35);
          handleGenres(35);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Comedy
      </button>
      <button
        onClick={() => {
          setGenre(80);
          handleGenres(80);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Crime
      </button>
      <button
        onClick={() => {
          setGenre(99);
          handleGenres(99);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Documentary
      </button>
      <button
        onClick={() => {
          setGenre(18);
          handleGenres(18);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Drama
      </button>
      <button
        onClick={() => {
          setGenre(10751);
          handleGenres(10751);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Family
      </button>
      <button
        onClick={() => {
          setGenre(14);
          handleGenres(14);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Fantasy
      </button>
      <button
        onClick={() => {
          setGenre(36);
          handleGenres(36);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        History
      </button>
      <button
        onClick={() => {
          setGenre(27);
          handleGenres(27);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Horror
      </button>
      <button
        onClick={() => {
          setGenre(10402);
          handleGenres(10402);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Music
      </button>
      <button
        onClick={() => {
          setGenre(9648);
          handleGenres(9648);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Mystery
      </button>
      <button
        onClick={() => {
          setGenre(10749);
          handleGenres(10749);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Romance
      </button>
      <button
        onClick={() => {
          setGenre(878);
          handleGenres(878);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Science Fiction
      </button>
      <button
        onClick={() => {
          setGenre(53);
          handleGenres(53);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        Thriller
      </button>
      <button
        onClick={() => {
          setGenre(10752);
          handleGenres(10752);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        War
      </button>
      <button
        onClick={() => {
          setGenre(10770);
          handleGenres(10770);
        }}
        className="col-1 m-2 btn btn-danger genre"
      >
        TV Movies
      </button>
      <button
        onClick={() => {
          setGenre(37);
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
