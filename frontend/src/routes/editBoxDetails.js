/* This page may be eliminated completely due 
to it being irrelevant to the project now */

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editBox, getBoxById } from '../services/boxService';
import { addItemToBox, deleteBoxItem } from '../services/boxItemService';

import '../App.css';

export default function EditBoxDetails() {

    const navigate = useNavigate();
    const { boxId } = useParams();

    const [labelName, setLabelName] = useState('');
    const [boxItemName, setBoxItemName] = useState('');

    const [boxItems, setBoxItems] = useState([]);

    const displayEditPage = useCallback(
        () => {
            getBoxById(boxId).then(retrievedBox => {
                setBoxItems(retrievedBox.boxItems);
                setLabelName(retrievedBox.labelName);
            });
        },
        [boxId]
    );

    useEffect(() => {
        displayEditPage()
    }, [displayEditPage]);

    const handleLabelNameChange = event => {
        setLabelName(event.target.value);
    };

    const handleBoxItemNameChange = event => {
        setBoxItemName(event.target.value);
    }

    const handleAdd = async (event) => {
        event.preventDefault();

        addItemToBox(boxId, { boxItemName }).then(() => {
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
        <div className="container card p-0 mt-5 border-3 border-dark">
            <h1 className="card-header border-dark border-3">Edit</h1>
            <div className="card-body d-flex justify-content-evenly mt-3">
                <div>

                    <form className="d-flex flex-column">

                        <label className="form-label align-self-start lead" htmlFor="labelName">Name: </label>
                        <input
                            className="form-control w-100"
                            type="text"
                            name="labelName"
                            id="labelName"
                            value={labelName}
                            onChange={handleLabelNameChange} />

                        <button className="btn btn-lg btn-dark mt-3 w-75" id="submitBtn" onClick={submitUpdate}><strong>Update</strong></button>
                    </form>
                </div>

                <div>
                    <form className="d-flex align-items-center m-3" onSubmit={handleAdd}>

                        <div className="input-group">
                            <input className="form-control" type="text" value={boxItemName} onChange={handleBoxItemNameChange} />
                            <button className="btn btn-dark p-1" type="submit" onClick={handleAdd}><strong>Add Item</strong></button>
                        </div>

                    </form>

                    <ul className="list-group">
                        {(boxItems && boxItems.length > 0) ?
                            boxItems.map(item => (
                                <li className="list-group-item d-flex row justify-content-around align-items-center" key={item.id}>
                                    <div className="p-0 col-11 lead">
                                        {item.itemName}
                                    </div>

                                    <button
                                        className="btn btn-sm btn-outline-dark col p-0 border-3"
                                        onClick={async (event) => {
                                            event.preventDefault();
                                            await deleteBoxItem(boxId, { "boxItemId": item.id, "boxItemName": item.itemName });
                                            await displayEditPage();
                                        }}>
                                        <strong>X</strong>
                                    </button>
                                </li>
                            ))
                            :
                            <h4 className="">There are no items in this box!</h4>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );

}