import React, {useEffect, useState} from 'react';
export default function SearchBar(){

     const handleChange = event => {console.log(search)};
     const[search, setSearch] = useState('');

        return(
      <form className="w-25 mx-auto my-5" action="/" method="get">
        {/* <label htmlFor="header-search">
          <span className="inside-boxes">Search items</span>
        </label> */}
        <div className="d-flex justify-content-center input-group">
          <input
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            id="header-search"
            placeholder="What's In The Boxes?"
            name="s"
          />
          <button onClick={handleChange} className="btn btn-dark" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        </form>
            );
        }