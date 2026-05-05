import axios from "axios"
import React, { useState } from "react"
import { useLocation, } from "react-router-dom"
const Mpesapayment = () => {
    const { singleproduct } = useLocation().state || {}
    const imagepath = "https://abedhiggs.alwaysdata.net/static/images/"
    // declare the states here
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")
    // function to make payment 
    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("wait up ..")
        const formdata = new FormData()
        // add/app
        formdata.append("amount", singleproduct.product_cost)
        formdata.append("phone", phone)
        try {
            const response = await axios.post("https://abedhiggs.alwaysdata.net/api/mpesa_payment", formdata)
            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            setError("something went wrong")
            setLoading("")

        }
    }
    return (
        <div className="row justify-content-center">
            <h1 className="text-info text-center">Make payment - Lipa na mpesa</h1>
            <div className="col-md-8 card shadow p-4">
                <img src={imagepath + singleproduct.product_photo} alt="" style={{ height: "400px", objectFit: "cover" }} />
                <div className="card-body">
                    <h1 className="text-success">{singleproduct.product_name}</h1>
                    <p>{singleproduct.product_name}</p>
                    <b className="text-warning">KSH {singleproduct.product_cost}</b><br />
                    {/* bind the states  */}
                    <h2 className="text-dark">{loading}</h2>
                    <h2 className="text-success">{success}</h2>
                    <h2 className="text-danger">{error}</h2>
                    <form action="" onSubmit={handlesubmit}>
                        <input type="number" className="form-control" placeholder="Enter phone 254xxxxxxxxx" onChange={(e) => setPhone(e.target.value)} />
                        <button className="btn btn-success w-100 " type="submit">Make payment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Mpesapayment