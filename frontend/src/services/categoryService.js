import { authService } from "../services/auth";


export async function deleteCategory(categoryId) {
    try {
        return await fetch(`/api/category/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => {
                console.log('Category deleted!');
                return authService.evaluate(response);
            });
    } catch (error) {
        console.log(error);
    }
}

export async function createCategory(data) {

    try {
        return await fetch(`/api/category`, {
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