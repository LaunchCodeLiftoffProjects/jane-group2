import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteBox, getBoxById } from '../services/boxService';

export default function BoxDisplay() {

    const navigate = useNavigate();
    const { boxId } = useParams();
    const [boxDetails, setBoxDetails] = useState({});

    useEffect(() => {
        async function setInfo() {
            setBoxDetails(await getBoxById(boxId));
            console.log(await getBoxById(boxId));
        }
        setInfo();
    }, [boxId]);

    const boxDeletion = async (event) => {
        event.preventDefault();
        await deleteBox(boxId);
        navigate('/', { replace: true });
    }

    return (
        <div>
            <h1>Box Display Route</h1>

            {/* Thinking of a border around the bottom div below */}
            <div>
                <h2>Box Id: {boxDetails.id}</h2>
                <h2>Box Name: {boxDetails.labelName}</h2>
                <h2>Items: </h2>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <Link to={`/boxDisplay/${boxId}/edit`}><button>Edit Box Details</button></Link>
                <button className="m-2" id="deleteBtn" onClick={boxDeletion}>Delete Box</button>
            </div>

            <Link to="/">Back to home page</Link>

        </div>
    );
}