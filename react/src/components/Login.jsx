import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Login = () => {
    const [userType, setUserType] = useState("student");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/apis/login", {
                userType,
                ...formData,
            });

            alert(response.data.message);
            localStorage.setItem("token", response.data.token); // Store JWT Token
            localStorage.setItem("userType", userType); // Store User Role
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="text-center">Login</h3>
                    <Form onSubmit={handleSubmit}>
                        {/* Select User Type */}
                        <Form.Group>
                            <Form.Label>User Type</Form.Label>
                            <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <option value="student">Student</option>
                                <option value="company">Company</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Email */}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
