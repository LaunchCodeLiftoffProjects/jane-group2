import './App.css';
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
    const [msg, setMsg] = useState("Loading...");

    useState(() => {
        fetch('/api/test')
            .then(response => response.text())
            .then(message => {
                setMsg(message);
            });
    });

    return (
        <div className='centered'>
            <header>
                <h1>{msg}</h1>
                <h1>Piece of Mind</h1>

                <nav>
                    <Link to="/login">Login</Link>
                </nav>

                <hr style={{
                    border: "0",
                    height: "1px",
                    backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"
                }} />
            </header>
            <Outlet />
        </div>
    );
}
