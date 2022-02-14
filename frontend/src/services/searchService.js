import { authService } from "../services/auth";

// TODO: Do we need this method?? getAllBoxes method from boxService.js does this already
export async function searchAllBoxes() {
    try {
        return await fetch("/api/boxes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authService.header(),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                let boxes = [];
                for (let box of json) {
                    boxes.push({
                        id: box.id,
                        labelName: box.labelName,
                        labelColor: box.labelColor,
                    });
                }
                return boxes;
            });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function searchBoxes(term) {
    try {
        return await fetch(`/api/search/${term}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authService.header(),
            },
        })
            .then((response) => response.json())
            .then((json) => {
                let boxes = [];
                for (let box of json) {
                    boxes.push({
                        id: box.id,
                        labelName: box.labelName,
                        labelColor: box.labelColor,
                    });
                }
                return boxes;
            });
    } catch (error) {
        console.error(error);
        return [];
    }
}
