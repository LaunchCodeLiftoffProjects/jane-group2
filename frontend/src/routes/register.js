import React, {
    useState
} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../App.css';

export default function Register() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ verifyPassword, setVerifyPassword ] = useState("");

    const submit = (e) => {
        e.preventDefault();
        console.log('user: ' + username);
        console.log('pass: ' + password);
        fetch("api/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                verifyPassword: verifyPassword,
            })
        }).then(response => {
            // TODO: use this response
            console.log('got ' + response.json());
        });
    }

    return (
        <div className="centered">
            <Container>
                <h1>Register</h1>

                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formVerifyPassword">
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Verify Password"
                            name="verifyPassword"
                            value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
                <p>Already have an account? <Link to="/login">Login here!</Link></p>
                <Link to="/">Back to home page</Link>
            </Container>
        </div>
    );
}