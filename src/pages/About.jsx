import "./About.css";
import tmdbLogo from "../assets/TMDB-logo.svg";

function About() {
  return (
    <div className="about-page container-fluid mt-5">
      <div className="row align-items-center justify-content-center px-5">
        <div className="project-description col-6 text-white">
          <h1 className="text-start text-danger h4">About this project</h1>
          <p className="text-start">
            Éste proyecto fue realizado durante un coding bootcamp en Hack
            Academy. La consigna del ejercicio consistía en desarrollar un sitio
            que consumiera la API de{" "}
            <a href="https://www.themoviedb.org/">
              <img
                className="tmdb-logo img-fluid"
                width="125"
                height="10"
                src={tmdbLogo}
                alt="TheMovieDataBase"
              />
            </a>{" "}
            y mostrara un listado de películas. El sitio debía contar también
            con un buscador de películas y una página para cada película que
            muestre detalles de la misma. El proyecto fue realizado utilizando
            React.js
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
