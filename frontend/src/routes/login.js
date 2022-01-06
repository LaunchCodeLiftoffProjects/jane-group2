import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import '../App.css';

export default function Login() {
    return (
        <div>
            <Container>
                <h1>Login</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control size="lg" type="text" placeholder="Username" name="username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control size="lg" type="password" placeholder="Password" name="password" />
                    </Form.Group>

                    <Button type="submit" variant="primary">Submit</Button>
                </Form>

                <p>"Don't already have an account?" <Link to="/register">Register here!</Link></p>
                <p>"Forgot Password?" <Link to="/forgot">Reset Password</Link></p>
                <Link to="/">Back to home page</Link>
            </Container>
        </div>


    );
}