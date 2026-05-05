import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
const Signup = () => {
    // declare our states here 
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [strength, setStrength] = useState("")
    // function to handle submit 
    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("Please  wait.....")
        // create empty digital envelope to store user inputs 
        const formdata = new FormData()
        // append/add 
        formdata.append("username", username)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("phone", phone)
        try {
            const response = await axios.post("https://abedhiggs.alwaysdata.net/api/signup", formdata)
            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }
    const checkPasswordStregth = (password) => {
    if (password.lenght < 4) {
        setStrength("weak");

    } else if (password.length < 8) {
        setStrength("medium");
    } else { setStrength("strong"); }
};
    return (
        <div className="row mt-4 justify-content-center">
            <div className="col-md-6 card shadow p-4">
                <h1>Signup</h1>
                {/* bind the state */}
                <h2 className="text-dark">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>
                <form action="" onSubmit={handlesubmit}>
                    <input type="text" className="form-control" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} /><br />
                    <input type="email" className="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} /><br />
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) =>{setPassword(e.target.value);checkPasswordStregth(e.target.value);}} /><br />
                    {password && (
                        <p
                            style={{
                                color:
                                    strength === "weak"
                                        ? "red"
                                        : strength ==="medium"
                                            ? "orange"
                                            : "green",
                            }}
                        >
                            password strength:{strength}
                        </p>
                    )}
                    <input type="tel" className="form-control" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} /><br />
                    <button className="btn btn-primary w-100" type="submit">Signup</button><br />
                    <p>Already have an account? <Link to="/signin">Sign in</Link> </p>
                </form>
            </div>
        </div>

    )
}
export default Signup 