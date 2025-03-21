import { useState, useEffect } from 'react'
import './App.css'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import ProductsDescription from './ProductsDescription';
import Products from './Products';
import Footer from './Footer';
import Login from './Login';
import SignupForm from './SignupForm';
import Cart from './Cart';
import Orders from './Orders';
import Categorieslist from './Categorieslist';
import Dummy from './Dummy';
import { useContext } from 'react';
import { createContext } from 'react';
import httpclient from './Axios'
import YourOrder from './YourOrder';




export const Context = React.createContext();

function App() {
  window.localStorage.removeItem('shoppink-state')

  return (
    <div>

      <Router>
        <Home />
        <main>
          <Routes>
            <Route path="/shoppink/login" element={<Login />} />
            <Route path="/home" element={<Products />} />
            <Route path="/shoppink/cart" element={<Cart />} />
            <Route path="/shoppink/orders" element={<Orders />} />
            <Route path="/shoppink/yourorders" element={<YourOrder />} />
            <Route path="productsdesc/:p_id" element={<ProductsDescription />} />
            <Route path="/shoppink/categories/:item" element={<Categorieslist />} />
            <Route path="/shoppink/signup" element={<SignupForm />} />
          </Routes>
        </main>
        <Footer />
      </Router>

    </div>



  )
}

export default App

