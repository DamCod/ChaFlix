import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ title, setTitle }) {
  let navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/search");
        }}
        className="search-form position-relative rounded me-3"
      >
        <input
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
            navigate("/search");
          }}
          type="text"
          className="search-bar form-control bg-dark text-white"
          id="searchInput"
          placeholder="Search movie..."
        />
        <button className="d-none" type="submit"></button>
        {title.length > 0 && (
          <button
            className="btn clear-search-btn  position-absolute"
            onClick={() => {
              setTitle("");
            }}
          >
            ×
          </button>
        )}
      </form>
    </>
  );
}

export default SearchBar;
