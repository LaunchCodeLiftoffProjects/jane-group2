import { authService } from "../services/auth";

export async function addItemToBox(boxId, data) {

    try {
        return fetch(`/api/boxes/${boxId}/edit`, {
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
        console.log(error);
    }

}

export async function deleteBoxItem(boxId, data) {

    try {
        return await fetch(`/api/boxes/${boxId}/edit`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log('Box deleted!');
                return authService.evaluate(response);
            });
    } catch (error) {
        console.log(error);
    }

}