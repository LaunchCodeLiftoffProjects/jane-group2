import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { createBox, getAllBoxes } from '../services/boxService';

export default function BoxList() {

    // Boxes are appended to a list by clicking on an add button. 
    // Each box should be a button that links to it's own route through an ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');

    async function updateBoxList() {
        setBoxList(await getAllBoxes());
    }

    useEffect(() => {
        updateBoxList();
    }, []);

    const handleChange = event => {
        setLabelName(event.target.value);
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        createBox({ labelName }).then(response => {
            setLabelName('');
            updateBoxList();
        });
    };

    return (
        <div className="container">
            <form className="d-flex justify-content-center m-3" onSubmit={handleAdd}>

                <div className="input-group w-25">
                    <input className="form-control" type="text" value={labelName} onChange={handleChange} />
                    <button className="btn btn-dark" type="submit" onClick={handleAdd}>Add Box</button>
                </div>

            </form>

            {(boxList && boxList.length > 0) ?
                <div class="box-card-grid-container">
                    {boxList.map(box => (
                        <Link
                            to={{
                                pathname: `/boxDisplay/${box.id}`,
                                state: { labelName }
                            }}
                            style={{ color: 'black', textDecoration: 'none' }}
                        >
                            <div className="card border-3" style={{ "background-color": box.labelColor }} key={box.id}>
                                <div className="box-header" style={{ "margin": "5px" }}>
                                    <img src={process.env.PUBLIC_URL + "/images/box.png"} alt="..." />
                                    <h2 id="box-header-text">{box.labelName}</h2>
                                    <div id="spacer"></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div> :
                <h3 className="mt-5">You currently have no boxes to show. Add boxes above to view list.</h3>
            }
        </div>
    );
}