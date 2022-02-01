import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import { searchAllBoxes, searchBoxes } from "../services/searchService";

export default function SearchPage() {
  const { searchTerm } = useParams();

  // Boxes display list by clicking on search button.
  // Each box should be a button that displays items by ID.

  console.log("search term " + searchTerm);

  const [boxList, setBoxList] = useState([]);
  const [labelName, setLabelName] = useState("");

  async function updateBoxSearch() {
    let result = await searchBoxes(searchTerm);
    setBoxList(await searchBoxes(searchTerm));
    console.log("backendreturn" + result);
  }

  useEffect(() => {
    updateBoxSearch();
  }, []);

  const handleChange = (event) => {
    setLabelName(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
        {boxList && boxList.length > 0 ? (
            <ul>
            {boxList.map((box) => (
            <li className="card" style={{ listStyle: "none" }} key={box.id}>
              <Link
                to={{
                  pathname: `/boxDisplay/${box.id}`,
                  state: { labelName },
                }}
              >
                {box.labelName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="mt-5">
          You currently have no boxes to show. Add boxes above to view list.
        </h3>
      )}
    </div>
  );
}
