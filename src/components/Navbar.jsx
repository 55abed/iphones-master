import React, { useEffect, useState } from 'react'
const Navbar = () => {
const [user, setUser] = useState(null);
useEffect(()=>{
    const loggedUser=JSON.parse(localStorage.getitem("user"));   setUser(loggedUser)
},[]);
const logout=()=>{
    localStorage.removeItem("user");
    setUser(null)
}
 

    return (
        <section class="row">
            <div class="col-md-12">
                {/* <!-- a nav with navbar content  --> */}
                <nav class="navbar navbar-expand-md bg-dark">
                    {/* <img src="images/logo.jpg" alt="" style={{ height: 50, width: 40 ,objectFit:"fill" }} /> */}
                    <a href="home" class=" navbar-brand text-danger">Iphones</a>
                    <button class="navbar-toggler" data-bs-target="#navbarcollapse" data-bs-toggle="collapse">
                        <span class="nav-link">welcome{user.name}</span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarcollapse">
                        <div class="navbar-nav">
                            <a href="/home" class="nav-link text-light">Home</a>
                            <a href="/addproducts" class="nav-link text-light">Add products</a>
                            {user ? (
                                <>
                                    <span class="nav-link">welcome{user.name}</span>
                                    <button onClick={logout} className='btn btn-danger'>logout</button>
                                </>
                            ) : (
                                <>
                                    <a href="/signin" class="nav-link text-light">sign in</a>
                                    <a href="/signup" class="nav-link text-light ">sign up</a>
                                </>
                            )}
                            {/* <!-- a division containg the links --> */}



                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default Navbar