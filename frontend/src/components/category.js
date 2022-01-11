import React, { useState } from "react";
import Categories from "./categories";

const Category = () => {
    const [data, setData] = useState(Categories)
    const filterResult=(catItem)=>{
        const result=Categories.filter((curData)=>{
            return curData.category===catItem;
        });
        setData(result)
    }
    return (
        <>
            <h1 className="centered">Category</h1>
            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-3">
                    <div className="col-md-3">
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>filterResult('Basement')}>Basement</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>filterResult('Bathroom')}>Bathroom</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>filterResult('Bedroom')}>Bedroom</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>filterResult('Family Room')}>Family Room</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>setData(Categories)}>All</button>


                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {data.map((values) => {
                                const {id,boxName,contents}=values;
                                return (
                                    <>
                                        <div className="col-md-4 mb-4" key={id}>
                                            <div className="card">
                                                <img src="./logo192.png" className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{boxName}</h5>
                                                    <p className="card-text">{contents}</p>
                                                    <button class="btn btn-primary">See Box</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Category;