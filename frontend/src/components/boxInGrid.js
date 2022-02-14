import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function BoxInGrid({ box }) {
    return (
        <div>
            <Link
                to={{ pathname: `/boxDisplay/${box.id}` }}
                style={{ color: 'black', textDecoration: 'none' }}
            >
                <div className="card border-3" style={{ "backgroundColor": box.labelColor }} key={box.id}>
                    <div className="box-header" style={{ "margin": "5px" }}>
                        <img src={process.env.PUBLIC_URL + "/images/box.png"} alt="..." />
                        <h2 id="box-header-text">{box.labelName}</h2>
                        <div id="spacer"></div>
                    </div>
                </div>
            </Link>
        </div>
    );
}