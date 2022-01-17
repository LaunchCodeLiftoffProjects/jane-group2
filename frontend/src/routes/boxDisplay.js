import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteBox, getBoxById } from '../services/boxService';

export default function BoxDisplay() {

    const navigate = useNavigate();
    const { boxId } = useParams();
    const [boxDetails, setBoxDetails] = useState({});
    const [boxItems, setBoxItems] = useState([]);

    useEffect(() => {
        async function setInfo() {
            setBoxDetails(await getBoxById(boxId));
            setBoxItems(await getBoxById(boxId).then(box => box.boxItems));
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

            <div>
                <h2>Box Id: {boxDetails.id}</h2>

                <h2>Box Name: {boxDetails.labelName}</h2>

                <h2>Items: </h2>
                <ul>
                    {boxItems.map(item => (
                        // TODO: Make a individual buttons to delete items from box
                        <li key={item.id}>{item.itemName}</li>
                    ))}
                </ul>

            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <Link to={`/boxDisplay/${boxId}/edit`}><button>Edit Box Details</button></Link>
                <button className="m-2" id="deleteBtn" onClick={boxDeletion}>Delete Box</button>
            </div>

            <Link to="/">Back to home page</Link>

        </div>
    );
}