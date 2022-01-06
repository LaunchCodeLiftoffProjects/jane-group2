import React from 'react';
import { Link } from 'react-router-dom';

export default function BoxDisplay(props) {
    return (
        <div>
            <h1>Box Display Route</h1>
            <h2>Box Name: {props.name}</h2>
            <Link to="/">Back to home page</Link>
        </div>
    );
}