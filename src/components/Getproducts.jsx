import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const Getproducts = () => {
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [Products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filtered_products = Products.filter(
    (item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase())
  );

  const getproducts = async () => {
    setLoading("Please wait...");
    try {
      const response = await axios.get(
        "https://abedhiggs.alwaysdata.net/api/getproducts"
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = existingCart.some(
      (item) => item.product_id === product.product_id
    );

    if (alreadyInCart) {
      alert(`${product.product_name} is already in your cart!`);
      return;
    }

    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("storage"));
    alert(`${product.product_name} added to cart!`);
  };

  useEffect(() => {
    getproducts();
  }, []);

  const imagepath = "https://abedhiggs.alwaysdata.net/static/images/";

  return (
    <div className="container-fluid px-3">
      <Carousel />

      <h1 className="text-primary text-center mt-4">Available Products</h1>

      <div className="row justify-content-center mt-3 mb-4">
        <input
          className="form-control w-75 w-md-50"
          type="search"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="text-secondary text-center">{loading}</h2>
      <h2 className="text-danger text-center">{error}</h2>

      <div className="row">
        {filtered_products.slice(0, visibleCount).map((singleproduct) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={singleproduct.product_id}
          >
            <div className="card shadow h-100">
              <img
                src={imagepath + singleproduct.product_photo}
                alt={singleproduct.product_name}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                  padding: "10px",
                }}
              />

              <div className="card-body">
                <h2 className="text-info">{singleproduct.product_name}</h2>

                <p>{singleproduct.product_description}</p>

                <b className="text-warning">
                  KSH {singleproduct.product_cost}
                </b>

                <button
                  className="btn btn-danger w-100 mt-3 mb-2"
                  onClick={() =>
                    navigate("/makepayment", { state: { singleproduct } })
                  }
                >
                  Purchase now
                </button>

                <button
                  className="btn btn-outline-danger w-100"
                  title="Add to Cart"
                  onClick={() => handleAddToCart(singleproduct)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        {visibleCount < filtered_products.length && (
          <button
            className="btn btn-primary"
            onClick={() => setVisibleCount(visibleCount + 8)}
          >
            Load More
          </button>
        )}
      </div>

      <div className="row justify-content-center mt-4 mb-4">
        <div className="card shadow col-11 col-md-8 p-4">
          <form
            action="https://formsubmit.co/solcyknowsball@gmail.com"
            method="POST"
          >
            <h3>Request your preferred order</h3>

            <input
              className="form-control mb-3"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />

            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />

            <textarea
              className="form-control mb-3"
              name="message"
              placeholder="Enter your preferred phone description"
              required
            ></textarea>

            <input
              type="submit"
              value="Send Message"
              className="btn btn-outline-danger"
            />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Getproducts;