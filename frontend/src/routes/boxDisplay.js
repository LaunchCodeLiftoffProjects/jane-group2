import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteBox, getBoxById, randomizeBoxColor } from '../services/boxService';
import { getQRCode } from '../services/qrCodeService';
import ReactToPrint from "react-to-print";
import { QRCode } from "../components/qrCode";
import "../routes/boxDisplay.css";

export default function BoxDisplay() {

    const navigate = useNavigate();
    const { boxId } = useParams();
    const [boxDetails, setBoxDetails] = useState({});
    const [boxItems, setBoxItems] = useState([]);
    const [qrCode, setQRCode] = useState();

    const [color, setColor] = useState();
    const [showColorPicker, setShowColorPicker] = useState(false);

    const qrCodeRef = useRef();

    useEffect(async () => {
        setBoxDetails(await getBoxById(boxId));
        setBoxItems(await getBoxById(boxId).then(box => box.boxItems));
        setQRCode(await getQRCode(boxId).then(qrCode => qrCode.base64));
    }, [boxId]);

    const boxDeletion = async (event) => {
        await deleteBox(boxId);
        navigate('/', { replace: true });
    };

    const changeColor = async () => {
        setBoxDetails(await randomizeBoxColor(boxId));
    }

    return (
        <div>
            <br/>
            <div className="card container p-0 border border-dark border-3">
                <div className="card-header border-dark border-3" style={{ "background-color": boxDetails.labelColor }}>
                    <div className="box-header">
                        <img src={process.env.PUBLIC_URL + "/images/box.png"} alt="..." />
                        <h1 id="box-header-text">{boxDetails.labelName}</h1>

                        <QRCode id='spacer' boxId={boxId} qrCode={qrCode} ref={qrCodeRef} />
                    </div>
                </div>

                <div className="card-body d-flex flex-column justify-content-center w-50 align-self-center">
                    <h2 className="align-self-start">Items</h2>
                    <table className="table table-hover table-striped border border-dark border-3">
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

                    <div>
                        <QRCode boxId={boxId} qrCode={qrCode} ref={qrCodeRef} />
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <Link className="btn btn-lg btn-dark m-2" id="deleteBtn" to={`/`}><strong>Go Back</strong></Link>
                    <Link className="btn btn-lg btn-dark m-2" id="deleteBtn" to={`/boxDisplay/${boxId}/edit`}><strong>Change Items</strong></Link>
                    <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={changeColor}><strong>Change Color</strong></button>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-lg btn-dark m-2" id="deleteBtn"><strong>Print QR Code</strong></button>}
                        content={() => qrCodeRef.current}
                    />
                    <button className="btn btn-lg btn-dark m-2" id="deleteBtn" onClick={boxDeletion}><strong>Delete</strong></button>
                </div>
            </div>
        </div>
    );
}