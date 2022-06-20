import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import FilterByTitle from "./pages/FilterByTitle";
import FilterByRating from "./pages/FilterByRating";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import NoMatch from "./pages/NoMatch";
import { useState } from "react";
import Layout from "./components/Layout";

function App() {
  const [title, setTitle] = useState("");

  return (
    <div className="App bg-dark animate__animated animate__fadeIn">
      <Routes>
        <Route path="/" element={<Layout title={title} setTitle={setTitle} />}>
          <Route index element={<Home />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/search" element={<FilterByTitle title={title} />} />
          <Route path="/filter-rating" element={<FilterByRating />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
