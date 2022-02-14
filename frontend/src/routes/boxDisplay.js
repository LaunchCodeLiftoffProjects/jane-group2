import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBox, editBox, getBoxById, randomizeBoxColor } from "../services/boxService";
import { addItemToBox, deleteBoxItem } from "../services/boxItemService";
import { getQRCode } from '../services/qrCodeService';
import ReactToPrint from "react-to-print";
import { QRCode } from "../components/qrCode";
import "../routes/boxDisplay.css";
import EditTRItemInputs from "../components/editTRItemInputs";

export default function BoxDisplay() {
    const navigate = useNavigate();

    const { boxId } = useParams();
    const [boxDetails, setBoxDetails] = useState({});
    const [boxItems, setBoxItems] = useState([]);
    const [labelName, setLabelName] = useState("");
    const [qrCode, setQRCode] = useState();
    const [itemNameToAdd, setItemNameToAdd] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const qrCodeRef = useRef();

    const updateBoxState = useCallback(async () => {
        setBoxDetails(await getBoxById(boxId));
        setLabelName(await getBoxById(boxId).then(box => box.labelName));
        setBoxItems(await getBoxById(boxId).then(box => box.boxItems));
        setQRCode(await getQRCode(boxId).then(receivedQRCode => receivedQRCode.base64));
    }, [boxId]);

    useEffect(() => {
        updateBoxState();
    }, [boxId, updateBoxState]);

    const handleBoxDeletion = async () => {
        await deleteBox(boxId);
        navigate('/', { replace: true });
    };

    const handleChangeColor = async () => {
        setBoxDetails(await randomizeBoxColor(boxId));
    }

    const handleLabelNameChange = event => {
        setLabelName(event.target.value);
        editBox(boxId, { labelName: event.target.value });
    }

    const handleEditToggle = () => {

        if (!isEditing) {
            setIsEditing(true);
        } else {
            setIsEditing(false);

            updateBoxState();
        }

    }

    const handleAddItemToggle = async () => {

        if (!isAdding) {
            setIsAdding(true);
        } else {
            setIsAdding(false);

            await addItemToBox(boxId, { itemName: itemNameToAdd });
            await setItemNameToAdd("");
            await updateBoxState();
        }

    }

    return (
        <div>
            <div className="card container p-0 mt-5 border border-dark border-3">
                <div className="card-header border-dark border-3" style={{ "backgroundColor": boxDetails.labelColor }}>
                    <div className="box-header">
                        <img src={process.env.PUBLIC_URL + "/images/box.png"} alt="..." />

                        {!isEditing ?
                            <h1 id="box-header-text">{labelName}</h1>
                            :
                            <div className="d-flex align-items-center">
                                <label className="me-3" htmlFor="boxName"><h2>Name</h2></label>
                                <input
                                    id="boxName"
                                    className="form-control"
                                    type="text" value={labelName}
                                    onChange={handleLabelNameChange}
                                />
                            </div>
                        }


                        <QRCode id="spacer" boxId={boxId} qrCode={qrCode} ref={qrCodeRef} />
                    </div>
                </div>

                <div className="card-body d-flex flex-column justify-content-center w-50 align-self-center">
                    <h2 className="align-self-start">Items</h2>
                    {boxItems && boxItems.length > 0
                        ?
                        <table className="table table-hover table-striped border border-dark border-3">
                            <thead>
                                <tr>
                                    <th scope="col"><strong>Name</strong></th>
                                    <th scope="col"><strong>Quantity</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {boxItems.map(item => (
                                    <tr key={item.id}>
                                        {!isEditing ?
                                            <>
                                                <th className="lead" scope="row">{item.itemName}</th>
                                                <td className="lead">x{item.itemQuantity}</td>
                                            </>
                                            :
                                            <>
                                                <EditTRItemInputs
                                                    itemQuantity={item.itemQuantity}
                                                    itemId={item.id}
                                                    itemName={item.itemName}
                                                />
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark border-3"
                                                        onClick={async (event) => {
                                                            event.preventDefault();
                                                            await deleteBoxItem(item.id);
                                                            await updateBoxState();
                                                        }}>
                                                        <strong>X</strong>
                                                    </button>
                                                </td>
                                            </>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div className="align-self-start">
                            <h5>There are no items in this box.</h5>
                        </div>
                    }

                    <div>
                        {!isAdding ?
                            <button
                                className="btn btn-dark border-3 mx-auto"
                                onClick={handleAddItemToggle}
                            >
                                Add Item
                            </button>
                            :
                            <form className="input-group w-50 mx-auto">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={itemNameToAdd}
                                    onChange={event => setItemNameToAdd(event.target.value)}
                                />
                                <button
                                    className="btn btn-dark border-3"
                                    type="submit"
                                    onClick={handleAddItemToggle}
                                >
                                    Add Item
                                </button>
                            </form>

                        }

                    </div>

                    <div>
                        <QRCode boxId={boxId} qrCode={qrCode} ref={qrCodeRef} />
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={() => navigate(-1)}><strong>Go Back</strong></button>
                    {/* <Link className="btn btn-lg btn-dark m-2" id="deleteBtn" to={`/boxDisplay/${boxId}/edit`}><strong>Update Items</strong></Link> */}
                    {!isEditing ?
                        <div>
                            <ReactToPrint
                                trigger={() => <button className="btn btn-lg btn-dark m-2" id="deleteBtn"><strong>Print QR Code</strong></button>}
                                content={() => qrCodeRef.current}
                            />
                            <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={handleEditToggle}><strong>Update Box</strong></button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={handleChangeColor}><strong>Change Color</strong></button>
                            <button className="btn btn-lg btn-success m-2" id="deleteBtn" onClick={handleEditToggle}><strong>Confirm</strong></button>
                        </div>
                    }

                    <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={handleBoxDeletion}><strong>Delete</strong></button>
                </div>
            </div>
        </div >
    );
}