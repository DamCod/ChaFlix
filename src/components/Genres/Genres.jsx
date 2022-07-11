import "./Genres.css";
import tmdbApiConfig from "../../tmdbApiConfig";
import axios from "axios";

function Genres({ setMovies }) {
  const genres = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science-Fiction", id: 878 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "TV Movies", id: 10770 },
    { name: "Western", id: 37 },
  ];

  const handleGenres = (genre) => {
    window.scrollTo(0, 0);
    const getMovies = async () => {
      tmdbApiConfig.params.with_genres = genre;
      const { data } = await axios.get("/discover/movie", tmdbApiConfig);
      setMovies(data.results);
    };
    getMovies();
  };
  return (
    <>
      <div className="genres-container-lg col-12 mb-5 px-0">
        {genres.map((genre) => (
          <button
            key={genre.name}
            onClick={() => {
              handleGenres(genre.id);
            }}
            className="col-1 m-2 btn btn-danger genre"
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="genres-container-md">
        <div className="d-flex justify-content-start genre-selector mb-3">
          <label
            className="text-white fs-4 fw-bold"
            htmlFor="inputGroupSelect01"
          >
            Genres
          </label>
          <select
            onChange={(e) => {
              handleGenres(e.target.value);
            }}
            className="form-select genre-selector ms-2 bg-dark text-white"
            id="inputGroupSelect01"
          >
            {genres.map((genre) => (
              <option key={genre.name} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Genres;
