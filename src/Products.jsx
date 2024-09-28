import React, { useState, useRef } from 'react'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as cartUtils from './cartutils';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import httpclient from './Axios'

const Products = () => {
    const navigate = useNavigate();

    //const { contextvalues, setcontextvalues } = useContext(Context);

    useEffect(() => {


        const fetchProducts = async () => {
            const productvalues = JSON.parse(window.localStorage.getItem('shoppink-state'));
            console.log("updatatedvalues in products", productvalues)
            const response = await httpclient.get('products');
            const products = response.data;



            const productDefaultValues = {
                ...productvalues,
                productitems: products,
                currentTime: new Date().toLocaleTimeString()
            };
            const productvalues1 = JSON.parse(window.localStorage.getItem('shoppink-state'));
            window.localStorage.setItem('shoppink-state', JSON.stringify(productDefaultValues));
            const productDefaultValues1 = {
                ...productvalues1,
                productitems: products,
                currentTime: new Date().toLocaleTimeString()
            };
            setcontextvalues(productDefaultValues1);
            console.log("Products after update in Products.jsx1", productvalues1);
            console.log("Products after update in Products.jsx", productDefaultValues1);
            console.log("Context values in products after login", contextvalues)
        };

        fetchProducts();
    }, [setcontextvalues]);

    /*const isproductincart = (product_id) => {
        const isproductvalues = JSON.parse(window.localStorage.getItem('shoppink-state'));
        //const temp = isproductvalues.usertxn.find(txn => txn.product_id === product_id)?.order_quantity || 0
        //console.log("printing temp in isproductincart", temp)
        const user_txns = isproductvalues.usertxn
        if (user_txns.length > 0) {
            const current_prd_txn = user_txns.find(txn => txn.product_id === product_id);

            if (current_prd_txn) {

                if (Object.keys(current_prd_txn).length > 0) {

                    return current_prd_txn.order_quantity
                }
            }
            else
                return null

        }
        else {
            return null
        }
    }*/

    useEffect(() => {
        console.log("product.jsx useffect final", contextvalues)
    }, [setcontextvalues]);

    const handlebanner = (category) => {
        setcontextvalues(prev => ({ ...prev, iscategorylist: category, login: false, productdesc: false, signup: false, showcart: false, placeorder: false, ishome: false }))
    }
    const bannerimages = [
        {
            category: 'w-dress',
            c_img: "https://www.beyoung.in/blog/wp-content/uploads/2022/02/header-1.jpg"
        },
        {
            category: 'm-dress',
            c_img: "https://myraymond.com/cdn/shop/files/PAY_DAY-_website_banner_d92cf258-7496-4178-a175-fa3a93215e87.png?v=1725535588"
        },
        {
            category: 'furn',
            c_img: "https://indiater.com/wp-content/uploads/2021/09/furniture-and-interior-detail-store-promotion-sale-ads-banner-on-yellow-floor-and-background-1536x592.jpg"
        },
        {
            category: 'elect',
            c_img: "https://www.bajajmall.in/content/dam/emistoremarketplace/index/10-10-22/swami/washing-machines-diwali-offers/big-banner/WMCLP_Row4_1_BigBanner_Desk_WMGen_PLP_B2B.jpg"
        },
        {
            category: 'groc',
            c_img: "https://media.istockphoto.com/id/516790252/vector/grocery-shopping.jpg?s=612x612&w=0&k=20&c=RjfUJ8j8StyIfTgPRA26O3qNGvL-1OyxXiDNWNmJFq8="
        },
        {
            category: 'tys',
            c_img: "https://img.freepik.com/free-vector/hand-drawn-kids-toys-sale-banner_23-2149651210.jpg"
        }
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };


    return (
        <div className={`${contextvalues.login ? 'fixed -z-10' : contextvalues.isMenuVisible ? 'relative -z-10' : contextvalues.ismemberlist ? 'relative -z-10' : 'relative'
            } `}>
            <div className='h-[30vh] mt-[4.5rem] md:mt-[2rem] bg-blue-500 w-full'   >
                <Slider {...settings}>
                    {

                        bannerimages.map(item => (
                            <div className='border-2 h-[30vh] lg:h-[40vh]   text-5xl  bg-gray-200 flex items-center justify-center'>
                                <img className='object-cover w-full h-full hover:cursor-pointer' src={item.c_img} alt={`Image  not availbel`} onClick={() => handlebanner(item.category)} />
                            </div>
                        ))



                    }
                </Slider>

            </div >



            <main className=' absolute flex h-100 w-[80vw] md:w-full flex-grow justify-center items-center sm:w-[80vw] mt-[3rem] sm:mt-[10rem] md:mt-[2rem]  lg:mt-[12rem] xl:mt-[10rem] z-90 '>
                <div className=' w-[90vw] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 top-[5rem] p-4 place-items-center gap-4 border border-black mx-auto'>
                    {

                        contextvalues.productitems.map((product, index) => (

                            <div key={product.product_id} className="flex flex-col border-2 border-pink-500 h-[25rem] w-[14rem] items-center sm:w-[17rem] md:h-[25rem] md:w-[13rem] lg:w-[12rem] xl:w-[15rem] rounded rounded-md bg-[#F8F4FF] " >
                                <div className='flex mt-3 h-[20rem] w-full justify-center items-start hover:cursor-pointer flex-col' onClick={() => cartUtils.handleproductsdesc(setcontextvalues, product.product_id, navigate)}>
                                    <div className='flex p-2 h-full w-full flex-col items-start  justify-center'>
                                        {
                                            /* <img className='object-cover hover:scale-105 w-[10rem] ml-5 h-full pb-75' src={product.image_link} alt='image not available' />*/

                                        }
                                        <img className='h-[10rem] w-[10rem] object-contain hover:scale-105 w-[10rem] ml-5' src={product.image_link} alt='image not available' />
                                        <h1 className='flex text-pink-700 font-bold  ml-1 mt-2 hover:underline'>{product.product_name}</h1>

                                    </div>
                                </div>
                                <div className='flex flex-row w-full justify-center items-center -mt-[1rem] h-full'>
                                    <h1 className='flex text-black text-xl font-medium top[-3rem] md:ml-[1rem] -mt-[0.5rem] ml-1'>{product.price}</h1>
                                    {

                                        (contextvalues.usertxn.find(txn => txn.product_id === product.product_id)?.order_quantity > 0) ? (
                                            <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem]  items-center'>
                                                <button className='flex text-3xl -mt-[0.5rem]' onClick={() => cartUtils.decrementquantity(setcontextvalues, product.product_id)} >-</button>
                                                <input type="text" className='flex text-md h-[1.5rem] w-[2rem] border border-black text-center' value={contextvalues.usertxn.find(txn => txn.product_id === product.product_id)?.order_quantity || 0} />
                                                <button className='flex text-2xl -mt-[0.5rem]' onClick={() => cartUtils.incrementquantity(setcontextvalues, product.product_id)}>+</button>
                                            </div>
                                        ) : (

                                            <button className='flex bg-white border ml-[2rem] justify-center md:text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-sm shadow-md border-1 border-black text-black font-medium rounded rounded-md p-1' onClick={() => cartUtils.addtocart(setcontextvalues, product.product_id)}>{(contextvalues.usertxn.find(txn => txn.product_id === product.product_id)?.order_quantity > 0) ? 'Remove from Cart' : 'Add to Cart'}</button>
                                        )


                                    }
                                </div>


                            </div>

                        ))}
                </div>
            </main >
        </div >
    )
}

export default Products