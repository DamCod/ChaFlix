import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import SearchBar from "../SearchBar/SearchBar";
import "./MainNav.css";

function MainNav({ setMovies, page, title, setTitle }) {
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
      collapseOnSelect
      expand="md"
      variant="dark"
      fixed="top"
      className={nav && "active"}
    >
      <Container fluid className="px-5 py-2">
        <Navbar.Brand href="/" className="text-danger fs-3 fw-bold">
          NotFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="d-flex flex-row justify-content-center ms-auto fs-5">
            <SearchBar
              setMovies={setMovies}
              page={page}
              title={title}
              setTitle={setTitle}
            />
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
