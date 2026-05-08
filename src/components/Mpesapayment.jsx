import axios from "axios"
import React, { useState } from "react"
import { useLocation } from "react-router-dom"

const Mpesapayment = () => {
    const location = useLocation()

    const singleproduct = location.state?.singleproduct
    const cartItems = location.state?.cartItems || []
    const total = location.state?.total || 0

    const imagepath = "https://abedhiggs.alwaysdata.net/static/images/"

    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")

    const amount = singleproduct ? singleproduct.product_cost : total

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("wait up ..")

        const formdata = new FormData()
        formdata.append("amount", amount)
        formdata.append("phone", phone)

        try {
            const response = await axios.post(
                "https://abedhiggs.alwaysdata.net/api/mpesa_payment",
                formdata
            )

            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            setError("something went wrong")
            setLoading("")
        }
    }

    return (
        <div className="row justify-content-center">
            <h1 className="text-info text-center">
                Make payment - Lipa na mpesa
            </h1>

            <div className="col-md-8 card shadow p-4">
                {singleproduct ? (
                    <>
                        <img
                            src={imagepath + singleproduct.product_photo}
                            alt=""
                            style={{
                                height: "400px",
                                width: "100%",
                                objectFit: "contain",
                                backgroundColor: "#f5f5f5"
                            }}
                        />

                        <div className="card-body">
                            <h1 className="text-success">
                                {singleproduct.product_name}
                            </h1>

                            <p>{singleproduct.product_description}</p>

                            <b className="text-warning">
                                KSH {singleproduct.product_cost}
                            </b>
                        </div>
                    </>
                ) : (
                    <div className="card-body">
                        <h2 className="text-success">Cart Order</h2>

                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="border-bottom mb-3 pb-3 d-flex align-items-center"
                            >
                                <img
                                    src={imagepath + item.product_photo}
                                    alt=""
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "contain",
                                        borderRadius: "10px",
                                        marginRight: "15px",
                                        backgroundColor: "#f5f5f5"
                                    }}
                                />

                                <div>
                                    <h5>{item.product_name}</h5>
                                    <p>KSH {item.product_cost}</p>
                                </div>
                            </div>
                        ))}

                        <h3 className="text-warning">
                            Total: KSH {total}
                        </h3>
                    </div>
                )}

                <h2 className="text-dark">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>

                <form onSubmit={handlesubmit}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter phone 254xxxxxxxxx"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button
                        className="btn btn-success w-100 mt-2"
                        type="submit"
                    >
                        Make payment with M-Pesa
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Mpesapayment