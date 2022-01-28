import { authService } from "../services/auth";

export async function getQRCode(boxId, data) {

    try {
        return fetch(`/api/qrcode/${boxId}`, {
            method: 'GET',
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