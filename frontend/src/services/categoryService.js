import { authService } from "../services/auth";

export async function getAllCategories() {

    try {
        return await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => response.json())
            .then(json => {
                let categories = [];
                for (let category of json) {
                    categories.push({
                        "id": category.id,
                        "categoryName": category.categoryName,
                        "boxes": category.boxes
                    });
                }
                return categories;
            });
    } catch (error) {
        console.error(error);
        return [];
    }

}

export async function deleteCategory(categoryId) {

    try {
        return await fetch(`/api/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authService.header()
            }
        })
            .then(response => {
                console.log(response);
            });
    } catch (error) {
        console.log(error);
    }

}

export async function createCategory(data) {

    try {
        return await fetch(`/api/categories`, {
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