import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart, handlechange }) => {
  const [price, setPrice] = useState(0);

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate total price of items in cart
  const handlePrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.amount;
    });
    setPrice(totalPrice); // Update the price state
  };

  // Recalculate price whenever cart changes
  useEffect(() => {
    handlePrice();
  }, [cart]);

  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="container my-5" style={{ width: "54%" }}>
      {cart.length === 0 ? (
        <div className="text-center">
          <h1>Your Cart is Empty</h1>
          <Link to={"/"} className="btn btn-warning">
            Continue Shopping...
          </Link>
        </div>
      ) : (
        cart.map((product) => {
          return (
            <div key={product.id} className="card mb-3 my-5" style={{ width: "700px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={product.imgSrc} className="img-fluid rounded-start" alt={product.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">{product.price} ₹</button>
                    <button className="btn btn-warning">Buy Now</button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <button onClick={() => handlechange(product, +1)} className="btn btn-secondary mx-1">+</button>
                  <button onClick={() => handlechange(product, -1)} className="btn btn-secondary mx-1">-</button>
                </div>
                <div>
                  <span>{product.price * product.amount} ₹</span>
                  <button onClick={() => handleRemove(product.id)} className="btn btn-danger mx-2">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {cart.length > 0 && (
        <div className="container text-center my-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button className="btn btn-warning mx-5">CheckOut</button>
          <button onClick={clearCart} className="btn btn-danger mx-2">
            Clear Cart
          </button>

          {/* Total Price Section */}
          <div className="mx-3">
            <h5>Total Price: ₹ {price}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
