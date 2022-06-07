import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import "./MainNav.css";

function MainNav({ setMovies, page }) {
  const [nav, setNav] = useState(false);

  const changeBg = () => {
    if (window.scrollY >= 66) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBg);
  });

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      className={nav ? "navbar active" : "navbar"}
    >
      <Container fluid className="px-5">
        <Navbar.Brand
          href="/"
          className="text-decoration-none text-danger fs-3 fw-bold"
        >
          ChaFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items-center ms-auto fs-5">
            <SearchBar setMovies={setMovies} page={page} />
            <Nav.Link href="/about" className="text-decoration-none nav-link">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
