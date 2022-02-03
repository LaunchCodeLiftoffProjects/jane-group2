import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { createBox, getAllBoxes } from "../services/boxService";
import { createCategory, getAllCategories } from "../services/categoryService";

export default function BoxPageContent() {

    // Boxes are appended to a list by clicking on an add button. 
    // Each box should be a button that links to it's own route through an ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');


    const [catId, setCatId] = useState(null);
    const [formCategories, setFormCategories] = useState([]);

    const [sidebarCategoryList, setSidebarCategoryList] = useState([]);
    const [sidebarCategoryName, setSidebarCategoryName] = useState("");

    const updateSidebarCategoryList = async () => {
        setSidebarCategoryList(await getAllCategories());
    };

    const updateBoxList = async () => {
        const allBoxes = await getAllBoxes();
        setBoxList(allBoxes);
    };

    const updateFormCategories = async () => {
        setFormCategories(await getAllCategories());
    };

    useEffect(() => {
        updateSidebarCategoryList();
        updateBoxList();
        updateFormCategories();
    }, []);

    // Sidebar Category methods
    const handleSidebarCategoryNameChange = event => {
        setSidebarCategoryName(event.target.value);
    };

    const handleSidebarCategoryAdd = event => {
        event.preventDefault();

        createCategory({ categoryName: sidebarCategoryName }).then(() => {
            setSidebarCategoryName('');
            updateSidebarCategoryList();
        });
    };

    // Box methods
    const handleLabelNameChange = event => {
        setLabelName(event.target.value);
    };

    const handleCategoryChange = event => {
        setCatId(event.target.value);
    };

    const handleBoxAdd = event => {
        event.preventDefault();

        createBox({ labelName, catId }).then(() => {
            setLabelName('');
            updateBoxList();
        });
    };

    return (
        <div className="d-flex">
            <div>

                <div>

                    <h1>Categories</h1>

                    <form className="input-group" onSubmit={handleSidebarCategoryAdd}>
                        <input className="form-control" type="text" value={sidebarCategoryName} onChange={handleSidebarCategoryNameChange} />
                        <button className="btn btn-dark" type="submit" onClick={handleSidebarCategoryAdd}>Create</button>
                    </form>

                </div>

                <div className="container-fluid mx-2">
                    <div className="d-flex flex-column mt-5 mx-3">

                        <button
                            className="btn btn-dark mb-2"
                            value="all"
                            onClick={updateBoxList}
                        >
                            All Boxes
                        </button>
                        {sidebarCategoryList.map(category => (
                            <button
                                className="btn btn-dark mb-2"
                                key={category.id}
                                value={category.id}
                                onClick={async (event) => {
                                    const allBoxes = await getAllBoxes();

                                    setBoxList(allBoxes.filter(box => {
                                        return box.catId === Number(event.target.value);
                                    }));
                                }}
                            >
                                {category.categoryName}
                            </button>
                        ))}

                    </div>
                </div>

            </div>
            <div className="container">

                <form className="d-flex justify-content-center m-3" onSubmit={handleBoxAdd}>

                    <div className="input-group w-50">

                        <input className="form-control" type="text" value={labelName} onChange={handleLabelNameChange} />

                        <select className="form-select" name="categories" id="categories" onChange={handleCategoryChange}>
                            <option value="">--Please choose a category--</option>
                            {formCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>

                        <button className="btn btn-dark" type="submit" onClick={handleBoxAdd}>Add Box</button>

                    </div>

                </form>

                {(boxList && boxList.length > 0) ?

                    <div className="box-card-grid-container">

                        {boxList.map(box => (
                            <Link
                                key={box.id}
                                to={{ pathname: `/boxDisplay/${box.id}` }}
                                style={{ color: 'black', textDecoration: 'none' }}
                            >
                                <div className="card border-3" style={{ "backgroundColor": box.labelColor }}>

                                    <div className="box-header" style={{ "margin": "5px" }}>

                                        <img src={process.env.PUBLIC_URL + "/images/box.png"} alt="..." />
                                        <h2 id="box-header-text">{box.labelName}</h2>
                                        <span id="spacer"></span>

                                    </div>

                                </div>
                            </Link>
                        ))}

                    </div> :
                    <h3 className="mt-5">You currently have no boxes to show. Add boxes above to view list.</h3>

                }
            </div>
        </div>
    );
}