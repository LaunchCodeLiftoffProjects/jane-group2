import React, { useState } from "react";
import { updateBoxItem } from "../services/boxItemService";

export default function EditTRItemInputs(props) {

    const [itemId] = useState(props.itemId);
    const [itemName, setItemName] = useState(props.itemName);
    const [itemQuantity, setItemQuantity] = useState(props.itemQuantity);

    const handleItemNameChange = event => {
        setItemName(event.target.value);
        updateBoxItem(itemId, { itemName: event.target.value, itemQuantity });
    }

    const handleItemQuantityChange = event => {
        setItemQuantity(event.target.value);
        updateBoxItem(itemId, { itemName, itemQuantity: event.target.value });
    }

    return (

        <>
            <th scope="row">
                <input
                    className="form-control w-50 mx-auto"
                    type="text"
                    value={itemName}
                    onChange={handleItemNameChange}
                />
            </th>
            <td>
                <input
                    min={1}
                    className="form-control w-25 mx-auto"
                    type="number"
                    value={itemQuantity}
                    onChange={handleItemQuantityChange}
                />
            </td>

        </>

    );
}