import Header from "../components/Header/Header";
import Movies from "../components/Movies/Movies";
import { useState, useEffect } from "react";
import tmdbApiConfig from "../tmdbApiConfig";
import axios from "axios";
import InfiniteScroll from "../components/InfiniteScroll";
import Genres from "../components/Genres/Genres";
import ScrollToTopBtn from "../components/ScrollToTopBtn/ScrollToTopBtn";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      tmdbApiConfig.params.page = page;
      const { data } = await axios.get("/discover/movie", tmdbApiConfig);
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    };
    getMovies();
  }, [page]);

  const styles = {
    div: {
      marginTop: "-10rem",
      zIndex: 9,
      position: "relative",
    },
  };

  return (
    <>
      <Header movies={movies} />
      <div className="container-fluid px-5 mt-3 position-relative">
        <div className="row g-4 justify-content-center" style={styles.div}>
          <Genres setMovies={setMovies} />
          <Movies movies={movies} />
        </div>
      </div>
      <ScrollToTopBtn />
      <InfiniteScroll setPage={setPage} page={page} />
    </>
  );
}

export default Home;
