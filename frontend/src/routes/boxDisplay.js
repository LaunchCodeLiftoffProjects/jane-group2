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
    };

    return (
        <div className="card container p-0 border border-dark border-3">
            <h1 className="card-header border-dark border-3">Box Display Route</h1>

            <div className="card-body d-flex flex-column justify-content-center w-50 align-self-center">
                <h2 className="align-self-start">Name: {boxDetails.labelName}</h2>

                <h2 className="align-self-start">Items:</h2>
                <table class="table table-hover table-striped border border-dark border-3">
                    <thead>
                        <tr>
                            <th scope="col"><strong>Id</strong></th>
                            <th scope="col"><strong>Name</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {boxItems.map(item => (
                            <tr className="" key={item.id}>
                                <th className="lead" scope="row">{item.id}</th>
                                <td className="lead">{item.itemName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="d-flex justify-content-center align-items-center">
                <Link className="btn btn-lg btn-dark m-2" to={`/boxDisplay/${boxId}/edit`}><strong>Edit</strong></Link>
                <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={boxDeletion}><strong>Delete</strong></button>
            </div>

            <Link to="/">Back to home page</Link>

        </div>
    );
}