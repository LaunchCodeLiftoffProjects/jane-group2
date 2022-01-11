import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function forgot(){





 return (
        <div>
            <Container>
                <h1>Forgot Password</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control size="lg" type="text" placeholder="Username" name="username" />
                    </Form.Group>



                    <Button type="submit" variant="primary">Submit</Button>
                </Form>

                <p>"Don't already have an account?" <Link to="/register">Register here!</Link></p>
                <Link to="/">Back to home page</Link>
            </Container>
        </div>


    );
 }