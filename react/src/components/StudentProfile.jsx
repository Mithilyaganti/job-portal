import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function StudentProfile() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/apis/jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Available Jobs</h2>
      <Row>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Col md={4} key={job.id} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold">{job.title}</h5>
                  <p className="text-muted">{job.company}</p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Skills Required:</strong> {job.skills.join(", ")}
                  </p>
                  <Button variant="primary">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No jobs available at the moment.</p>
        )}
      </Row>
    </Container>
  );
}

export default StudentProfile;
