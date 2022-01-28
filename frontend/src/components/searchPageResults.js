import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { createBox, getAllBoxes } from '../services/boxService';

export default function SearchList() {

    // Boxes display list by clicking on search button.
    // Each box should be a button that displays items by ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');

    async function updateBoxSearch() {
        setBoxList(await getAllBoxes());
    }

    useEffect(() => {
        updateBoxSearch();
    }, []);

    const handleChange = event => {
        setLabelName(event.target.value);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        searchBox({ labelName }).then(response => {
            setLabelName('');
            updateBoxSearch();
        });
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