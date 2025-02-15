import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [aparId, setAparId] = useState("");
  const [projects, setProjects] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="p-4 shadow-lg rounded-4"
                style={{
                  background: "white",
                  border: "none",
                }}
              >
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#4A00E0" }}>
                  Create Your Account
                </h2>
                <Form>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group controlId="aparId" className="mb-3">
                    <Form.Label className="fw-semibold">Apar ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Apar ID"
                      value={aparId}
                      onChange={(e) => setAparId(e.target.value)}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group controlId="projects" className="mb-3">
                    <Form.Label className="fw-semibold">Projects</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe your projects"
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group controlId="role" className="mb-3">
                    <Form.Label className="fw-semibold">Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="rounded-3"
                    >
                      <option value="student">Student</option>
                      <option value="company">Company</option>
                    </Form.Select>
                  </Form.Group>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="primary"
                      className="w-100 fw-bold rounded-3"
                      style={{ backgroundColor: "#4A00E0", border: "none" }}
                    >
                      Register
                    </Button>
                  </motion.div>
                </Form>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary fw-semibold" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
