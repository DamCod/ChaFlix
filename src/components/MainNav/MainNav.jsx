import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./MainNav.css";

function MainNav() {
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
          <Nav className="ms-auto fs-5">
            <NavDropdown
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                  stroke="white"
                  strokeWidth="1"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="/filter-title"
                className="text-decoration-none"
              >
                By Title
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/filter-rating"
                className="text-decoration-none"
              >
                By Rating
              </NavDropdown.Item>
            </NavDropdown>
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
