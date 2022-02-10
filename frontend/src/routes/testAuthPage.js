import React, {
    useEffect,
    useState
} from 'react';
import '../App.css';
import { authService } from '../services/auth';

//TODO: Possibly use this route to create a user profile/account page
export default function TestAuth() {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("api/testWithAuth", {
            method: "GET",
            headers: { 'Authorization': authService.header() }
        })
            .then(authService.evaluate)
            .then(json => {
                setText(json.message);
            });
    }, []);

    return (
        <div className="centered">
            <h1>If you're seeing this, you are logged in and authorized to the backend.</h1>
            {
                <div>
                    <b>Message</b>
                    <p>{text}</p>
                </div>
            }
        </div>
    );
}