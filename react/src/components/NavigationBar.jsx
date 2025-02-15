import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { List, X } from "lucide-react";

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
      }}
    >
      <Container>
        {/* Logo (JobPortal Image) */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Image
            src="/jobportal-logo.png"  // Replace with your actual image path
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
            <Nav.Link href="#" className="text-white mx-3 fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-3 fw-semibold">
              Jobs
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-3 fw-semibold">
              Companies
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-3 fw-semibold">
              Contact
            </Nav.Link>
          </Nav>

          {/* Login & Register Buttons */}
          <div className="d-flex gap-3">
            <Button variant="outline-light" className="fw-bold">
              Login
            </Button>
            <Button variant="light" className="fw-bold">
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
