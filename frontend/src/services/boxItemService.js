import { authService } from "../services/auth";

export async function addItemToBox(boxId, data) {

    try {
        return fetch(`/api/boxes/${boxId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                return json;
            });
    } catch (error) {
        console.error(error);
    }

}

export async function deleteBoxItem(itemId) {

    try {
        return await fetch(`/api/boxItems/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => response);
    } catch (error) {
        console.error(error);
    }

}

export async function updateBoxItem(itemId, data) {

    try {
        return await fetch(`/api/boxItems/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => console.log(json));
    } catch (error) {
        console.error(error);
    }

}