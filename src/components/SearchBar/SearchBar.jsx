import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ title, setTitle }) {
  let navigate = useNavigate();

  return (
    <>
      <form className="position-relative rounded me-3">
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
