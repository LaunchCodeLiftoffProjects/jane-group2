import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Login() {
    return (
        <div className="centered">
            <h1>Login Route</h1>

            <form>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <Link to="/">Back to home page</Link>
        </div>
    );
}