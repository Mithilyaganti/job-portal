import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { List, X } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="md"
      expanded={expanded}
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #4A00E0, #8E2DE2)",
        padding: "10px 20px",
        marginTop: "-15px", // Moves the navbar up by 15px
      }}
    >
      <Container>
        {/* Logo (JobPortal Image) */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkhX_0hRKgL6YEXanSour0bu4IFAK9Z0RhtA&s width=150px"
            alt="JobPortal Logo"
            width={40}
            height={40}
            className="me-2"
          />
          <span className="text-white fw-bold fs-4">JobPortal</span>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        >
          {expanded ? <X size={28} color="white" /> : <List size={28} color="white" />}
        </Navbar.Toggle>

        {/* Navigation Links & Buttons */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white mx-3 fw-semibold">
              Home
            </Nav.Link>
          </Nav>

          {/* Login & Register Buttons */}
          <div className="d-flex gap-3">
            <Button variant="outline-light" className="fw-bold" as={Link} to="/login">
              Login
            </Button>
            <Button variant="light" className="fw-bold" as={Link} to="/register">
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
