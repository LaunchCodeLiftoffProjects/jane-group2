import { authService } from "../util/auth";

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
                        "labelName": box.labelName
                    });
                }
                return boxes;
            });
    } catch (error) {
        console.error(error);
        return [];
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
            .then(response => {
                return authService.evaluate(response);
            });
    } catch (error) {
        console.log(error);
    }

}