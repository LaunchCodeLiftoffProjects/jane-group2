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

    const [isLoading, setIsLoading] = useState(true);
    const [boxList, setBoxList] = useState([]);

    useEffect(() => {
        async function updateBoxSearch() {
            setIsLoading(true);
            setBoxList(await searchBoxes(searchTerm));
            setIsLoading(false);
        }

        updateBoxSearch();
    }, [searchTerm]);

    let resultMessage;

    if (isLoading) {
        resultMessage =
            <div>
                <h5 className="nice-font">Loading...</h5>
            </div>;
    } else {
        resultMessage =
            <div>
                {boxList && boxList.length > 0
                    ?
                    (
                        <div>
                            <h5 className="nice-font mb-5">We found {boxList.length} matches for '{searchTerm}'</h5>

                            <div className="box-card-grid-container">
                                {boxList.map(box => (
                                    <BoxInGrid box={box} searchTerm={searchTerm} key={box.id} />
                                ))}
                            </div>
                        </div>
                    )
                    : <div>
                        <h5 className="nice-font">We found no matches for '{searchTerm}'</h5>
                    </div>
                }
            </div>;
    }

    return (
        <div className="container">
            <h2 className="m-4 nice-font">Search Results</h2>

            {resultMessage}
        </div>
    );
}
