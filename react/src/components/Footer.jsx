import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "./Footer";

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, #4A00E0, #8E2DE2)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Container className="text-center py-5">
        <h1 className="fw-bold">Welcome to JobPortal</h1>
        <p className="fs-5">
          Find your dream job or hire the best talent with our AI-powered job
          matching system.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="light" className="fw-bold px-4 py-2">
            Find Jobs
          </Button>
          <Button variant="outline-light" className="fw-bold px-4 py-2">
            Post a Job
          </Button>
        </div>
      </Container>

      <Container className="mt-5">
        <Row className="text-center">
          <Col md={4} className="p-4">
            <h3>🚀 AI-Powered Job Matching</h3>
            <p>
              Our smart system filters jobs based on skills and preferences
              using vector-based comparisons.
            </p>
          </Col>
          <Col md={4} className="p-4">
            <h3>🏢 Verified Companies</h3>
            <p>Only trusted companies can post jobs, ensuring quality hires.</p>
          </Col>
          <Col md={4} className="p-4">
            <h3>📊 Data-Driven Insights</h3>
            <p>
              Get personalized job recommendations and insights for better
              career decisions.
            </p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
