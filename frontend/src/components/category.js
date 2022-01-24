import React, { useState } from "react";
import { Link } from 'react-router-dom';
/*import createCategory from '../services/categoryService';*/




 
export default function CategoryPage() {

    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])

    

   /* const filterResult=(catItem)=>{
        const result=categories.filter((curData)=>{
            return curData.category===catItem;
        });
        setCategories(result)
    }*/

    const handleChange = event => {
        setCategoryName(event.target.value)
    }

  const handleAdd =  (event) => {
    event.preventDefault()

    /*createCategory({categoryName}).then(response =>{
        console.log(categories)
    }

)*/}

   
    
    
    return (
        <>
           <div>
            <h1 className="centered">Category</h1>
            <form onSubmit={handleAdd}>
             <input type="text" value={categoryName} onChange={handleChange} />
             <button type="submit" onClick={handleAdd}>Create</button>
            </form>
           </div>

            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-3">
                    <div className="col-md-3">
                    
                        <button className="btn btn-warning w-100 mb-4" onClick={() =>setCategories(categories)}>All</button>
                        {
                            categories.map(category => (
                                <li style={{ listStyle: "none" }} key={category.id}>
                                    <Link
                                        to={{
                                            pathname: `/category/${category.id}`,
                                            state: { category }
                                        }}
                                        >
                                    
                                        {category.labelName}
                                    </Link>
                                </li>
                            ))
                        }


                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {categories.map((values) => {
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
                                                                      

