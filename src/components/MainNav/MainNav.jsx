import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import "./MainNav.css";

function MainNav({ setMovies, page, title, setTitle }) {
  const [nav, setNav] = useState(false);
  const params = useLocation();

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
    <Navbar expand="lg" variant="dark" sticky="top" className={nav && "active"}>
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
            {(params.pathname === "/" || params.pathname === "/search") && (
              <SearchBar
                setMovies={setMovies}
                page={page}
                title={title}
                setTitle={setTitle}
              />
            )}
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
