import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const Signin = () => {
    let navigate = useNavigate()
    // declare the two states here
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // 3 states for hosting data 
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)




    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("please wait....")
        //    create digital envelope to fetch user data 
        const formdata = new FormData()
        // add/append 
        formdata.append("email", email)
        formdata.append("password", password)
        try {
            const response = await axios.post("https://abedhiggs.alwaysdata.net/api/signin", formdata)
            setSuccess(response.data.message)
            setLoading("")
            // if login in/signin is successfull we save user to local storage
            // NB:redirect user to homepage(getproducts
            if (response.data.user) {
                // log in success
                localStorage.setItem("user", JSON.stringify(response.data.user))
                // navigate user to homepage 
                navigate("/home")
                setSuccess(response.data.message)
            } else {
                // log in failed\\
                // redirect user to homepage 
            }
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }

    return (
        <div className="row mt-4 justify-content-center">
            <div className="col-md-6 card shadow p-4">
                <h1>sign in</h1>
                {/* bind the state*/}
                <h2 className="text-dark">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>
                <form action="" onSubmit={handlesubmit}>

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password Input Group */}
                    <div className="input-group mb-2">
                        <input
                            type={showPassword ? "text" : "password"} // Switches between text and password
                            placeholder="Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button className="btn btn-primary w-100" type="submit">signin</button>
                    <h5>Don't have an account? <Link to="/signup">signup</Link></h5>
                </form>
            </div>
        </div>
    )
}
export default Signin


