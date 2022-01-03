import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Register() {
    return (
        <div className="centered">
            <h1>Login</h1>

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
                    <input
                        type="password"
                        id="password"
                        name="verifyPassword"
                        placeholder="Verify password"
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login here!</Link></p>
            <Link to="/">Back to home page</Link>
        </div>
    );
}