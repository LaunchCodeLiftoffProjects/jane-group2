import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editBox, getBoxById } from '../services/boxService';
import { addItemToBox, deleteBoxItem } from '../services/boxItemService';

import '../App.css';

export default function EditBoxDetails() {

    const navigate = useNavigate();
    const { boxId } = useParams();

    const [labelName, setLabelName] = useState('');
    const [boxItemName, setBoxItemName] = useState('');

    const [boxDetails, setBoxDetails] = useState({});
    const [boxItems, setBoxItems] = useState([]);

    async function displayEditPage() {
        setBoxDetails(await getBoxById(boxId));
        setLabelName(boxDetails.labelName);
        setBoxItems(await getBoxById(boxId).then(box => box.boxItems));
    }

    useEffect(() => {
        displayEditPage()
    }, []);

    const handleLabelNameChange = event => {
        setLabelName(event.target.value);
    };

    const handleBoxItemNameChange = event => {
        setBoxItemName(event.target.value);
    }

    const handleAdd = async (event) => {
        event.preventDefault();

        addItemToBox(boxId, { boxItemName }).then(response => {
            setBoxItemName('');
            displayEditPage();
        });
    };

    const submitUpdate = async (event) => {
        event.preventDefault();
        await editBox(boxId, { labelName });
        navigate(`/boxDisplay/${boxId}`, { replace: true });
    }

    return (
        <div>
            <h1>Edit Box Details</h1>

            <form className="d-flex flex-column">

                <label for="labelName">Name: </label>
                <input
                    type="text"
                    name="labelName"
                    id="labelName"
                    value={labelName}
                    onChange={handleLabelNameChange} />

                <form onSubmit={handleAdd}>
                    <input type="text" value={boxItemName} onChange={handleBoxItemNameChange} />
                    <button type="submit" onClick={handleAdd}>Add Item</button>
                </form>

                <ul>
                    {boxItems.map(item => (
                        <li key={item.id}>
                            {item.itemName}
                            <button
                                onClick={async (event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    const deletedItemId = item.id;
                                    const deletedItemName = item.itemName;
                                    await deleteBoxItem(boxId, { deletedItemId, deletedItemName });
                                    await displayEditPage();
                                }}>
                                X
                            </button>
                        </li>
                    ))}
                </ul>

                <button className="m-1" id="submitBtn" onClick={submitUpdate}>Update Box</button>
            </form>
        </div>
    );

}