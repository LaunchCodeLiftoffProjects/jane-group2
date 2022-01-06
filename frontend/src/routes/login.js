import React, {
    useState
} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { authService } from '../util/auth';
import '../App.css';
import {
    useNavigate,
    useLocation,
  } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    let from = location.state?.from?.pathname || "/";

    console.log('coming to login page from: ' + from);

    const submit = (e) => {
        e.preventDefault();
        authService.login(username, password).then(json => {
            // Send them back to the page they tried to visit when they were redirected to the login page.
            navigate(from, { replace: true });
            console.log('success: ' + json.success);
            console.log('username: ' + json.user.username);
            console.log('token: ' + json.user.token);
        });

        /*
        console.log('user: ' + username);
        console.log('pass: ' + password);
        fetch("api/auth", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('success: ' + json.success);
            console.log('username: ' + json.user.username);
            console.log('token: ' + json.user.token);
            localStorage.setItem('box-project-user', JSON.stringify(json.user));
        });
        */
    }

    return (
        <div>
            <Container>
                <h1>Login</h1>

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

                    <Button type="submit" variant="primary">Submit</Button>
                </Form>

                <p>Don't already have an account? <Link to="/register">Register here!</Link></p>
                <Link to="/">Back to home page</Link>
            </Container>
        </div>


    );
}