export async function getAllBoxes() {

    try {
        const response = await fetch('/api/boxes');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }

}

export async function createBox(data) {

    try {
        console.log(data);
        const response = await fetch(`http://localhost:8080/api/boxes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }

}