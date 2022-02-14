import { authService } from "../services/auth";

export async function getAllBoxes() {

    try {
        return await fetch('/api/boxes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => response.json())
            .then(json => {
                let boxes = [];
                for (let box of json) {
                    boxes.push({
                        "id": box.id,
                        "labelName": box.labelName,
                        "labelColor": box.labelColor,
                        "catId": box.catId
                    });
                }
                return boxes;
            });
    } catch (error) {
        console.error(error);
        return [];
    }

}

export function getBoxById(boxId) {

    try {
        return fetch(`/api/boxes/${boxId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => response.json())
            .then(json => {
                return json;
            });
    } catch (error) {
        console.error(error);
    }

}

export async function createBox(data) {

    try {
        return await fetch(`/api/boxes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            },
            body: JSON.stringify(data)
        })
            .then(response => response);
    } catch (error) {
        console.error(error);
    }

}

export async function editBox(boxId, data) {

    try {
        return await fetch(`/api/boxes/${boxId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            },
            body: JSON.stringify(data)
        })
            .then(response => response);
    } catch (error) {
        console.error(error);
    }

}

export async function deleteBox(boxId) {

    try {
        return await fetch(`/api/boxes/${boxId}`, {
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

export async function randomizeBoxColor(boxId) {

    try {
        return await fetch(`/api/boxes/${boxId}/randomizeColor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => {
                // console.log('Box color randomized!');
                // console.log(response);
                return authService.evaluate(response);
            });
    } catch (error) {
        console.error(error);
    }

}