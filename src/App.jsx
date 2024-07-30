import React from 'react'
import Shoppingcart from './Shoppingcart'
import { CartProvider } from './CartContext'
import './App.css'

const App = () => {
  return (
    <div>
<CartProvider>
      <Shoppingcart/>
      </CartProvider>
  </div>
  )
}

export default App