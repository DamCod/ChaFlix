import "./RecommendedMovies.css";
import axios from "axios";
import tmdbApiConfig from "../../tmdbApiConfig";
import { useState, useEffect } from "react";

function RecommendedMovies({ movieId }) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    const getRecommendations = async () => {
      const recommendations = await axios.get(
        `/movie/${movieId}/similar`,
        tmdbApiConfig
      );
      setRecommendedMovies(recommendations.data.results);
    };
    getRecommendations();
  }, [movieId]);
  return <div>RecommendedMovies</div>;
}

export default RecommendedMovies;
