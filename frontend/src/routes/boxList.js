import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import BoxDisplay from './boxDisplay';
import { v4 as uuidv4 } from 'uuid';
import { createBox, getAllBoxes } from '../services/boxService';

export default function BoxList() {

    // Boxes are appended to a list by clicking on a create box button. 
    // Each box should be a button that links to it's own route through an ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');

    const myBoxes = async () => {
        const boxes = await getAllBoxes;
        console.log(boxes);
    }

    const handleChange = event => {
        setLabelName(event.target.value);
    }

    const handleAdd = () => {
        myBoxes();
        const newBoxList = boxList.concat({ labelName, id: uuidv4() });

        setBoxList(newBoxList);

        createBox({ labelName });

        setLabelName('');
    }



    return (
        <div className="centered">
            <h1>BoxPage Route aka Index</h1>

            <h4>Login to see your boxes!</h4>
            <div>
                <input type="text" value={labelName} onChange={handleChange} />
                <button type="button" onClick={handleAdd}>Add</button>
            </div>

            <ul>
                {boxList.map(box => (
                    <li style={{ listStyle: "none" }}>
                        <Link
                            to={{
                                pathname: '/boxDisplay',
                                state: { labelName }
                            }}
                            key={box.id}
                        >
                            {box.labelName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}