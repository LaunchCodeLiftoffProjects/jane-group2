import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';
import { createBox, getAllBoxes } from '../services/boxService';

export default function BoxList() {

    // Boxes are appended to a list by clicking on an add button. 
    // Each box should be a button that links to it's own route through an ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');

    useEffect(() => {
        async function setBoxes() {
            setBoxList(await getAllBoxes());
        }
        setBoxes();
    })

    const handleChange = event => {
        setLabelName(event.target.value);
    }

    const handleAdd = async () => {
        setBoxList(await getAllBoxes());

        createBox({ labelName });

        setLabelName('');
    }



    return (
        <div className="centered">
            <form>
                <input type="text" value={labelName} onChange={handleChange} />
                <button type="button" onClick={handleAdd}>Add</button>
            </form>

            <ul>
                {boxList.map(box => (
                    <li style={{ listStyle: "none" }} key={box.id}>
                        <Link
                            to={{
                                pathname: '/boxDisplay',
                                state: { labelName }
                            }}
                        >
                            {box.labelName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}