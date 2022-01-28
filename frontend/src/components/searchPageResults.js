import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { searchAllBoxes, searchBoxes } from '../services/searchService';

export default function SearchPage() {

    const { searchTerm } = useParams();

    // Boxes display list by clicking on search button.
    // Each box should be a button that displays items by ID.

    console.log('search term ' + searchTerm);
    
    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');

    async function updateBoxSearch() {
        setBoxList(await searchBoxes(searchTerm));
    }

    useEffect(() => {
        updateBoxSearch();
    }, []);

    const handleChange = event => {
        setLabelName(event.target.value);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

    };

    return (
        <div className="container">
            <form className="d-flex justify-content-center m-3" onSubmit={handleAdd}>

                <div className="input-group w-25">
                    <input className="form-control" type="text" value={labelName} onChange={handleChange} />
                    <button className="btn btn-dark" type="submit" onClick={handleAdd}>Search Box</button>
                </div>

            </form>

            {(boxList && boxList.length > 0) ?
                <ul>
                    {boxList.map(box => (
                        <li className="card" style={{ listStyle: "none" }} key={box.id}>
                            <Link
                                to={{
                                    pathname: `/boxDisplay/${box.id}`,
                                    state: { labelName }
                                }}
                            >
                                {box.labelName}
                            </Link>
                        </li>
                    ))}
                </ul> :
                <h3 className="mt-5">You currently have no boxes to show. Add boxes above to view list.</h3>
            }
        </div>
    );
}