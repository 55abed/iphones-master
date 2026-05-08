import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"))
        setUser(loggedUser)
    }, [])

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <section className="row">
            <div className="col-md-12">

                <nav className="navbar navbar-expand-md bg-dark px-4 py-3">

                    {/* Logo */}
                    <a href="/home" className="navbar-brand text-danger fw-bold fs-3">
                        iHub
                    </a>

                    {/* Nav Links */}
                    <div className="d-flex align-items-center gap-4">

                        <a href="/home" className="nav-link text-light">
                            Home
                        </a>

                        <a href="/addproducts" className="nav-link text-light">
                            Add products
                        </a>

                        <a href="/cart" className="nav-link text-light">
                            Cart 🛒
                        </a>

                    </div>

                    {/* Right Side */}
                    <div className="ms-auto d-flex align-items-center gap-3">

                        {user ? (
                            <>
                                <span className="text-light">
                                    Welcome {user.username}
                                </span>

                                <button
                                    onClick={logout}
                                    className="btn btn-danger btn-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a href="/signin" className="nav-link text-light">
                                    Sign in
                                </a>

                                <a href="/signup" className="nav-link text-light">
                                    Sign up
                                </a>
                            </>
                        )}

                    </div>

                </nav>

            </div>
        </section>
    )
}

export default Navbar