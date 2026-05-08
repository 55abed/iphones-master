import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const imagepath = "https://abedhiggs.alwaysdata.net/static/images/";

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    window.dispatchEvent(new Event("storage"));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("cart");
      setCartItems([]);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = typeof item.product_cost === 'string'
        ? Number(item.product_cost.replace(/[^0-9.-]+/g, ""))
        : Number(item.product_cost);

      return acc + (isNaN(price) ? 0 : price);
    }, 0);
  };

  return (
    <div className="container mt-5 text-light pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Shopping Cart 🛒</h2>

        {cartItems.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      <hr className="border-secondary" />

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-4">Your cart is empty.</p>

          <button
            className="btn btn-info text-white mt-3"
            onClick={() => navigate("/")}
          >
            Back to Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group shadow">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center border-secondary py-3"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={imagepath + item.product_photo}
                      alt={item.product_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "15px"
                      }}
                      className="rounded"
                    />

                    <div>
                      <h6 className="mb-0">{item.product_name}</h6>
                      <small className="text-warning fw-bold">
                        Ksh. {item.product_cost}
                      </small>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light border-secondary shadow p-3">
              <h4>Order Summary</h4>

              <hr className="border-secondary" />

              <div className="d-flex justify-content-between mb-3">
                <span>Items:</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 fs-5 fw-bold">
                <span>Total:</span>
                <span className="text-success">
                  Ksh. {calculateTotal().toLocaleString()}
                </span>
              </div>

              <button
                className="btn btn-success w-100 py-2 fw-bold"
                onClick={() =>
                  navigate("/makepayment", {
                    state: {
                      cartItems: cartItems,
                      total: calculateTotal()
                    }
                  })
                }
              >
                complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;