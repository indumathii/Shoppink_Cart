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

  const [defaultvalues, setdefaultvalues] = useState({
    login: false,
    signup: false,
    productsdesc: false,
    currentuser: {},
    cartcount: 0,
    showcart: false,
    currentpid: false,
    totalcartvalue: false,
    placeorder: false,
    ismemberlist: false,
    users: [],
    ishome: false,
    isMenuVisible: false,
    iscategorylist: false,
    logsubmit: false,
    signupsubmit: false,
    productitems: [],
    usertxn: []
  })

  const [contextvalues, setcontextvalues] = useState(() => {
    window.localStorage.removeItem('shoppink-state');
    const savedState = window.localStorage.getItem('shoppink-state');
    console.log("saved state in app.jsx", savedState)
    console.log("default values in app.jsx", defaultvalues)
    return savedState ? JSON.parse(savedState) : defaultvalues;

  });

  useEffect(() => {
    window.localStorage.setItem('shoppink-state', JSON.stringify(contextvalues));
    console.log("contextvalues in app.jsx useeffect", contextvalues)
  }, [setcontextvalues]);


  return (
    <Router>
      <Context.Provider value={{ contextvalues, setcontextvalues }}>
        {/*

        */
          console.log("contextvalues in app.jsx return", contextvalues)
        }
        <Home />


        <Routes>
          <Route path="/shoppink/login" element={<Login />} />
          <Route path="/home" element={<Products />} />
          <Route path="/shoppink/signup" element={<SignupForm />} />
          <Route path="/shoppink/categories/:item" element={<Categorieslist />} />
          <Route path="productsdesc/:p_id" element={<ProductsDescription />} />
          <Route path="/shoppink/cart" element={<Cart />} />
          <Route path="/shoppink/orders" element={<Orders />} />
          {/*
          
          
          
          
          <Route path="/dummy" element={<Dummy />} />*/}
        </Routes>

        <Footer />
      </Context.Provider>
    </Router>



  )
}

export default App

