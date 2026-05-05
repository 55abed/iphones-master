import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Carousel from "./Carousel";
import Footer from "./Footer";

const Getproducts = () => {
    let navigate = useNavigate();
    // declare our states here 
    const[visibleCount,setVisibleCount]=useState(8)
    const [loading, setLoading] = useState("")
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    // Define state here 
    const[search,setSearch]=useState("")
    // filter logic goes here 
    const filtered_products=products.filter((item)=>
    item.product_name.toLowerCase().includes(search.toLowerCase())||
item.product_description.toLowerCase().includes(search.toLowerCase()))
    // function to get products
    const getproducts = async () => {
        setLoading("please wait...")
        try {
            const response = await axios.get("https://abedhiggs.alwaysdata.net/api/getproducts")
            setProducts(response.data)
            setLoading("")
        } catch (error) {
            setError(error.message)
            setLoading("")

        }
    }

    // call the function 
    useEffect(() => {
        getproducts()
    }, [])
    console.log(products)
    const imagepath = "https://abedhiggs.alwaysdata.net/static/images/"

    return (
                <div className="row">
        
        <div className="row">
            {/* carousel goes here  */}
            <Carousel />
            <h1 className="text-primary text-center">Available Products</h1>
                {/* search bar goes here */}
            <div className="row justify-content-center mt-3 mb-3">
                <input
                className="form-control w-50"
                type="search"
                placeholder="search products" 
                value={search}
                onChange={(e)=>setSearch(e.target.value)}/>

            </div>
        
        
            {/* bind the states  */}
            <h2 className="text-secondary">{loading}</h2>
            <h2 className="text-danger">{error}</h2>
            
            {/* map here  */}
            {filtered_products.slice(0,visibleCount).map(singleproduct => (

                <div className="col-md-3  mb-4">
                    <div className="card shadow h-100">

                        {/* image goes here  */}
                        <img src={imagepath + singleproduct.product_photo} alt="" style={{ height: "300px", objectFit: "cover" }} />
                        <div className="card-body">
                            <h2 className="text-info">{singleproduct.product_name}</h2>
                            <p>{singleproduct.product_description}</p>
                            <b className="text-warning">KSH {singleproduct.product_cost}</b><br />
                            <button className="btn btn-danger w-100" onClick={() => navigate("/makepayment", { state: { singleproduct } })}>Purchase now</button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-center mt-3">
                {visibleCount<filtered_products.length &&
                (<button
                    className="btn btn-primary"
                    onClick={()=>setVisibleCount(visibleCount +8)}
                    >
                        Load More
                        </button>
                )}
            </div>
            <Footer />
            </div>
        </div>
    )
}
export default Getproducts