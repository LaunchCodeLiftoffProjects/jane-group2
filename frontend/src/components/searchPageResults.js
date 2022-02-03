import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { searchBoxes } from "../services/searchService";
import BoxInGrid from "../components/boxInGrid";
import "../components/searchPageResults.css";

export default function SearchPage() {
  const { searchTerm } = useParams();

  // Boxes display list by clicking on search button.
  // Each box should be a button that displays items by ID.

  console.log("Search Term: " + searchTerm);

  const [isLoading, setIsLoading] = useState(true);
  const [boxList, setBoxList] = useState([]);

  async function updateBoxSearch() {
    setIsLoading(true);
    let result = await searchBoxes(searchTerm);
    setBoxList(await searchBoxes(searchTerm));
    console.log("backendreturn" + result);
    setIsLoading(false);
  }

  useEffect(() => {
    updateBoxSearch();
  }, [searchTerm]);

  let resultMessage;

  if (isLoading) {
    resultMessage = 
    <div>
        <h5>Loading...</h5>
    </div>;
  } else {
    resultMessage =
    <div>
        {boxList && boxList.length > 0
          ?
            (
            <div>
              <h5 className="nice-font">We found {boxList.length} matches for '{searchTerm}'</h5>
              <br/>
              <div className="box-card-grid-container">
                {boxList.map(box => (
                    <BoxInGrid box={box} searchTerm={searchTerm}></BoxInGrid>
                ))}
              </div>
            </div>
            )
          : <div>
              <h5>We found no matches for '{searchTerm}''</h5>
            </div>
        }
    </div>;
  }

  return (
    <div className="container">
      <br/>
      <h2 className="nice-font">Search Results</h2>

      {resultMessage}
    </div>
  );
}
