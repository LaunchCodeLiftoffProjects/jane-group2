import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editBox, getBoxById } from '../services/boxService';

import '../App.css';

export default function EditBoxDetails() {

    const navigate = useNavigate();
    const { boxId } = useParams();
    const [labelName, setLabelName] = useState('');
    const [boxDetails, setBoxDetails] = useState({});

    useEffect(() => {
        async function setInfo() {
            setBoxDetails(await getBoxById(boxId));
            setLabelName(boxDetails.labelName);
        }
        setInfo();
    }, [boxId]);

    const handleChange = event => {
        setLabelName(event.target.value);
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
                <label for="labelName">Name:</label>

                <input
                    type="text"
                    name="labelName"
                    id="labelName"
                    value={labelName}
                    onChange={handleChange} />

                <button id="submitBtn" onClick={submitUpdate}>Update Box</button>
            </form>
        </div>
    );

}