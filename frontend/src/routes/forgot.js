import React from 'react';
import { Link } from 'react-router-dom';

export default function forgot() {

    return (
        <div>
            <div className="container">
                <h1>Forgot Password</h1>

                <form>
                    <div className="mb-3" controlId="formUsername">
                        <input size="lg" type="text" placeholder="Username" name="username" />
                    </div>

                    <button type="submit" variant="primary">Submit</button>
                </form>

                <p>"Don't already have an account?" <Link to="/register">Register here!</Link></p>
                <Link to="/">Back to home page</Link>
            </div>
        </div>


    );
}