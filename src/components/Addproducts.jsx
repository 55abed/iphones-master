import axios from "axios"
import React, { useState } from "react"
const Addproducts = () => {
    // declare the states here 
    const [product_name, setProductnName] = useState("")
    const [product_description, setProductDescription] = useState("")
    const [product_cost, setProductCost] = useState("")
    const [product_photo, setProductPhoto] = useState("")
    // define 3 steps for hosting data 
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    // function to handle submit 
    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("please wait....")
        // create digital envelope to store data 
        const formdata = new FormData()
        // ad/append 
        formdata.append("product_name", product_name)
        formdata.append("product_description", product_description)
        formdata.append("product_cost", product_cost)
        formdata.append("product_photo", product_photo)
        try {
            const response = await axios.post("https://abedhiggs.alwaysdata.net/api/addproduct", formdata)
            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }
    return (
        <div className="row justify-content-center mt-2 ">
            <div className="card shadow col-md-8 p-4">
                <h1 className="text-info">Add product</h1>
                {/* bind the states  */}
                <h2 className="text-dark">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>
                <form action="" onSubmit={handlesubmit}>
                    <input type="text" className="form-control" placeholder="Enter product name" onChange={(e) => setProductnName(e.target.value)} /><br />
                    <textarea className="form-control" placeholder="Enter product description" onChange={(e) => setProductDescription(e.target.value)}></textarea><br />
                    <input type="number" className="form-control" placeholder="Enter product cost" onChange={(e) => setProductCost(e.target.value)} /><br />
                    <input type="file" accept="image/*" className="form-control" placeholder="Choose File" onChange={(e) => setProductPhoto(e.target.files[0])} /><br />
                    <button type="submit" className="w-100 btn btn-primary">Add product</button>
                </form>
            </div>


        </div >
    )
}
export default Addproducts