import React, {
    useEffect,
    useState
} from 'react';
import { Container } from 'react-bootstrap';
import '../App.css';

import { authService } from '../services/auth';

export default function TestAuth() {
    const [text, setText] = useState(null);

    useEffect(() => {
        fetch("api/testWithAuth", {
            method: "GET",
            headers: { 'Authorization': authService.header() }
        })
            .then(authService.evaluate)
            .then(text => {
                setText(text);
            });
    }, []);

    return (
        <div className="centered">
            <Container>
                <h1>If you're seeing this, you are logged in and authorized to the backend.</h1>
                {text &&
                    <div>
                        <b>Message</b>
                        <p>{text}</p>
                    </div>
                }
            </Container>
        </div>
    );
}