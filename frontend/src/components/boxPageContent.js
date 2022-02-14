import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { createBox, getAllBoxes } from "../services/boxService";
import { createCategory, deleteCategory, getAllCategories } from "../services/categoryService";

export default function BoxPageContent() {

    // Boxes are appended to a list by clicking on an add button. 
    // Each box should be a button that links to it's own route through an ID.

    const [boxList, setBoxList] = useState([]);
    const [labelName, setLabelName] = useState('');


    const [catId, setCatId] = useState(null);
    const [selectCategoryList, setSelectCategoryList] = useState([]);

    const [sidebarCategoryList, setSidebarCategoryList] = useState([]);
    const [sidebarCategoryName, setSidebarCategoryName] = useState("");

    const updateCategories = async () => {
        setSidebarCategoryList(await getAllCategories());
        setSelectCategoryList(await getAllCategories());
    };

    const updateBoxList = async () => {
        const allBoxes = await getAllBoxes();
        setBoxList(allBoxes);
    };

    useEffect(() => {
        updateCategories();
        updateBoxList();
    }, []);

    // Sidebar Category methods
    const handleCategoryNameChange = event => {
        setSidebarCategoryName(event.target.value);
    };

    const handleCategoryAdd = event => {
        event.preventDefault();

        createCategory({ categoryName: sidebarCategoryName }).then(() => {
            setSidebarCategoryName('');
            updateCategories();
        });
    };

    const handleCategoryDeletion = event => {
        event.preventDefault();

        deleteCategory(event.target.value).then(() => {
            updateCategories();
        });
    }

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

                <div className="m-3">

                    <h3>Categories</h3>

                    <form className="input-group needs-validation" onSubmit={handleCategoryAdd}>
                        <input className="form-control has-validation" type="text" value={sidebarCategoryName} onChange={handleCategoryNameChange} required />
                        <button className="btn btn-dark" type="submit" onClick={handleCategoryAdd}>Create</button>
                        <div className="invalid-feedback">Category name is required</div>
                    </form>

                </div>

                <div className="container-fluid mx-2">
                    <div className="d-flex flex-column mt-5">

                        <button
                            className="btn btn-dark mb-2 mx-auto w-100"
                            value="all"
                            type="button"
                            onClick={updateBoxList}
                        >
                            All Boxes
                        </button>
                        {sidebarCategoryList.map(category => (
                            <div
                                className="row input-group mb-2 mx-auto justify-content-center"
                                key={category.id} value={category.id}
                                onClick={async (event) => {
                                    const allBoxes = await getAllBoxes();

                                    setBoxList(allBoxes.filter(box => {
                                        return box.catId === Number(event.target.value);
                                    }));
                                }}>
                                <button
                                    className="btn btn-outline-dark col-10"
                                    value={category.id}
                                >
                                    {category.categoryName}
                                </button>
                                <button
                                    className="btn btn-dark col-2"
                                    type="button"
                                    value={category.id}
                                    onClick={handleCategoryDeletion}
                                >
                                    X
                                </button>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
            <div className="container">

                <form className="d-flex justify-content-center m-3" onSubmit={handleBoxAdd}>

                    <div className="input-group w-50">

                        <input className="form-control" type="text" value={labelName} onChange={handleLabelNameChange} required />

                        <select
                            className="form-select"
                            name="categories"
                            id="categories"
                            onChange={handleCategoryChange}
                            required
                        >
                            <option selected disabled value="">--Please choose a category--</option>
                            {selectCategoryList.map(category => (
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