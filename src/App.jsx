import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Product from './components/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import { items } from './components/Data';


const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);

  const handlechange = (item, d) => {
    // Avoid direct mutation of cart
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        // Update the amount by the change (d)
        const updatedItem = { ...cartItem, amount: cartItem.amount + d };
        
        // If the amount is 0 or less, reset it to 1 or remove the item based on preference
        if (updatedItem.amount <= 0) {
          updatedItem.amount = 1; // Or you could choose to remove the item
        }

        return updatedItem;
      }
      return cartItem;
    });

    setCart(updatedCart); // Update cart state
  };

  return (
    <Router>
      <Navbar cart={cart} setData={setData} />
      <Routes>
        <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handlechange={handlechange} />} />
      </Routes>
    </Router>
  );
};

export default App;
