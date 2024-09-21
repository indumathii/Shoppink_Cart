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
    currentuser: [],
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
    productitems: []
  })
  /*{
    p_id: 1,
    p_category: 'Mobiles',
    p_name: 'Mobile 1',
    p_price: '$550',
    p_desc: 'This is mobile with good display',
    p_rating: 4,
    p_sales: '900+ bought in past month',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'mob',
    order_status: 'New'
  },

  {
    p_id: 2,
    p_category: 'Dresses',
    p_name: 'Dress 1 w-dress',
    p_price: '$55',
    p_rating: 5,
    p_sales: '1500+ bought in past month',
    p_desc: 'This dress is handmade and elegant',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'w-dress',
    order_status: 'New'

  },


  {
    p_id: 3,
    p_category: 'Electronics',
    p_name: 'Electronics 1 elect',
    p_price: '$750',
    p_rating: 4,
    p_sales: '2k+ bought in past month',
    p_desc: 'Cool gadgets and lots of exciting features',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'elect',
    order_status: 'New'
  },



  {
    p_id: 4,
    p_category: 'Furnitures',
    p_name: 'Furnitures 1 furn',
    p_desc: 'Wood and wood only',
    p_price: '$450',
    p_rating: 4,
    p_sales: '500+ bought in past month',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },

  {
    p_id: 5,
    p_category: 'Toys',
    p_name: 'Toys 1',
    p_price: '$70',
    p_rating: 5,
    p_sales: '700+ bought in past month',
    p_desc: 'All you need in your kids play area',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'tys',
    order_status: 'New'
  },
  {
    p_id: 6,
    p_category: 'Groceries',
    p_name: 'Groceries 1',
    p_price: '$30',
    p_rating: 5,
    p_sales: '5k+ bought in past month',
    p_desc: 'Home needs met on time with quality',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'groc',
    order_status: 'New'
  },
  {
    p_id: 7,
    p_category: 'Electronics',
    p_name: 'Electronics 2',
    p_price: '$780',
    p_rating: 5,
    p_sales: '7k+ bought in past month',
    p_desc: 'Save more electricity using our electronics',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },
  {
    p_id: 8,
    p_category: 'Electronics',
    p_name: 'Mobiles 2',
    p_price: '$700',
    p_rating: 5,
    p_sales: '2k+ bought in past month',
    p_desc: 'This is mobile with Excellent camera quality',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },
  {
    p_id: 9,
    p_category: 'Electronics',
    p_name: 'Dresses 2',
    p_price: '$60',
    p_rating: 5,
    p_sales: '1k+ bought in past month',
    p_desc: 'Western wear to party wear, one fits all',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },
  {
    p_id: 10,
    p_category: 'Furnitures',
    p_name: 'Furnitures 2',
    p_price: '$250',
    p_rating: 4,
    p_sales: '9k+ bought in past month',
    p_desc: 'Good quality wood and handmade chairs,tables,sofa,bed and much more',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },
  {
    p_id: 11,
    p_category: 'Dresses',
    p_name: 'Dresses 3',
    p_price: '$150',
    p_rating: 4,
    p_sales: '3k+ bought in past month',
    p_desc: 'Long lasting fabric with glitter work',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'm-dress',
    order_status: 'New'
  },

  {
    p_id: 12,
    p_category: 'Toys',
    p_name: 'Toys 2',
    p_price: '$10',
    p_rating: 3,
    p_sales: '3k+ bought in past month',
    p_desc: 'This is Toys 2 happpy play',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },

  {
    p_id: 13,
    p_category: 'Electronics',
    p_name: 'Electronics 3',
    p_desc: 'This is Electronics 3',
    p_price: '$500',
    p_rating: 4,
    p_sales: '950+ bought in past month',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },

  {
    p_id: 14,
    p_category: 'Groceries',
    p_name: 'Groceries 2',
    p_desc: 'This is Groceries 2',
    p_price: '$50',
    p_rating: 3,
    p_sales: '800+ bought in past month',
    p_img: 'https://media.istockphoto.com/id/1324697728/photo/brown-teddy-bear-mother-hugging-her-baby-on-light-pink-background-lovely-emotional-moment.jpg?s=1024x1024&w=is&k=20&c=WNdpfS0nbCIomSy2gg3424Np89r6fHFWOXz3EWSTa3c=',
    p_status: 'Add to Cart',
    quantity: 0,
    sub_category: 'furn',
    order_status: 'New'
  },
]*/


  const [contextvalues, setcontextvalues] = useState(() => {
    const savedState = window.localStorage.getItem("shoppink-states");
    return savedState ? JSON.parse(savedState) : defaultvalues;

  });

  useEffect(() => {
    window.localStorage.setItem("shoppink-states", JSON.stringify(contextvalues));
  }, [contextvalues]);


  return (
    <Router>
      <Context.Provider value={{ contextvalues, setcontextvalues }}>
        {

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

