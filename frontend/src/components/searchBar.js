import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const navigate = useNavigate();
    const [search, setSearch] = useState();

    const handleSearch = event => {
        event.preventDefault();

        if (search) {
            navigate(`/search/${search}`, { replace: true });
            setSearch("");
        }

    }

    return (
        <div>
            <form className="me-3 align-self-center" action="/" method="get">
                <div className="d-flex justify-content-center input-group">
                    <input
                        className="form-control"
                        type="text"
                        id="header-search"
                        placeholder="What's In The Boxes?"
                        name="s"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />

                    <button className="btn btn-dark" type="submit" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}