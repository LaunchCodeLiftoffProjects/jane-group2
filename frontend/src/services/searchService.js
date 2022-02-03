import { authService } from "../services/auth";
import { useNavigate } from "react-router-dom";

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
    console.log("fetch");
    return await fetch(`/api/search/${term}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authService.header(),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("response ");
        let boxes = [];
        for (let box of json.result) {
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

function SearchAllBoxes(){
let navigate = useNavigate();
async function handleSubmit(event) {
  event.preventDefault();
  navigate("/box/search");
  };
}