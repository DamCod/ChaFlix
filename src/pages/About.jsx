function About() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6 text-white">
          <h1 className="text-start">About This Project</h1>
          <p>
            Éste proyecto fue realizado en el marco del coding bootcamp de Hack
            Academy en febrero de 2022. La consigna consistía en desarrollar un
            sitio que consumiera la API de{" "}
            <a href="https://www.themoviedb.org/">TheMovieDataBase</a> y
            mostrara un listado de películas. El sitio debía contar también con
            un buscador de películas por título y uno por rating, y una página
            para cada película que muestre detalles de la misma.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
