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



export const Context = React.createContext();

function App() {
  window.localStorage.removeItem('shoppink-state')

  return (
    <Router>

      {/*
<Route path="/shoppink/signup" element={<SignupForm />} />

          <Route path="/shoppink/categories/:item" element={<Categorieslist />} />
          <Route path="productsdesc/:p_id" element={<ProductsDescription />} />
          <Route path="/shoppink/cart" element={<Cart />} />
          <Route path="/shoppink/orders" element={<Orders />} />
        */

      }
      <Home />


      <Routes>
        <Route path="/shoppink/login" element={<Login />} />
        <Route path="/home" element={<Home />} />


        {/*
          
          
          
          
          <Route path="/dummy" element={<Dummy />} />*/}
      </Routes>

      <Footer />

    </Router>



  )
}

export default App

