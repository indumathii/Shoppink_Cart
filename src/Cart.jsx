import React, { useMemo } from 'react'
import { useContext, useEffect } from 'react';
import * as cartUtils from './cartutils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handle_place_order } from './actions';


const Cart = () => {
    const currentstate = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userTransactionsString = JSON.stringify(currentstate.usertxn);
    const currentuserTransactionsString = JSON.stringify(currentstate.currentcart_txns);
    useEffect(() => {
        cartUtils.carttotalvalue(currentstate, dispatch)
        console.log('orderplaced inside useeffect', currentstate.productitems)
        add_cartitems = Array.isArray(currentstate.usertxn) ? currentstate.usertxn.filter(product => (product.user_id === currentstate.currentuser.id) && (product.cart_status === 'Remove from Cart')) : [];
        add_cartitems2 = Array.isArray(currentstate.currentcart_txns) ? currentstate.currentcart_txns.filter(product => (product.user_id === currentstate.currentuser.id) && (product.cart_status === 'Remove from Cart')) : [];
    }, [currentuserTransactionsString]);

    let add_cartitems = Array.isArray(currentstate.usertxn) ? currentstate.usertxn.filter(product => (product.user_id === currentstate.currentuser.id) && (product.cart_status === 'Remove from Cart')) : [];
    let add_cartitems2 = Array.isArray(currentstate.currentcart_txns) ? currentstate.currentcart_txns.filter(product => (product.user_id === currentstate.currentuser.id) && (product.cart_status === 'Remove from Cart')) : [];
    console.log("printing add_cart_items", add_cartitems2)

    const handleplaceorder = () => {
        console.log("inside handleplaceorder")
        const place_order_values = {
            ...currentstate,
            placeorder: true, login: false, productdesc: false, signup: false, showcart: false, iscategorylist: false, ishome: false

        }
        dispatch(handle_place_order(place_order_values))



    }


    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>
            <div className='flex flex-grow h-90 min-w-screen flex-col md:ml-[5rem] lg:ml-[15rem] xl:ml-[17rem]'>
                <div className='flex flex-grow h-50 w-[80vw] border md:p-2 border-[1rem] border-l-blue-500 border-r-white border-b-white border-t-white text-md md:text-2xl  mt-10 flex-col md:w-[70vw] lg:w-[50vw] mt-[5rem]'>
                    <div className='flex ml-3 mt-2 text-sm md:text-xl'>
                        <h2 className='flex text-black font-bold'><span className='flex mr-2'>Minutes away to grab </span> <span className='flex text-pink-600' >{add_cartitems.length} </span> <span >&nbsp;items in cart!!</span></h2>
                    </div>
                    <div className='flex flex-grow h-full w-full ml-3 bg-gradient-to-r from-white via-pink-100 to-pink-400 mx-auto mt-6 flex-col'>

                        {
                            add_cartitems2.map((product, index) => (
                                <div className='flex flex-row border border-1 border-black m-1/2 h-[10rem] w-full'>
                                    <img className='object-contain hover:scale-105 h-[7rem] w-[6rem] md:h-[9rem] md:w-[10rem] p-2' src={product.image_link} alt={product.product_name} />
                                    <div className='flex flex-col ml-2 md:ml-5 w-full'>
                                        <h1 className='flex text-black text-md md:text-2xl font-bold mt-2'>{product.product_name}</h1>
                                        <div className='flex flex-col md:flex-row justify-between w-full  md:mx-2'>
                                            {

                                                (currentstate.usertxn.find(txn =>
                                                    txn.user_id === currentstate.currentuser.id &&
                                                    txn.product_id === product.product_id
                                                )?.order_quantity > 0) && (
                                                    <div key={index} className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem]  items-center'>
                                                        <button className='flex text-3xl -mt-[0.5rem]' onClick={() => cartUtils.decrementquantity(currentstate, product.product_id, dispatch)} >-</button>
                                                        <input type="text" className='flex text-md h-[1.5rem] w-[2rem] border border-black text-center' value={currentstate.usertxn.find(txn => txn.user_id === currentstate.currentuser.id && txn.product_id === product.product_id)?.order_quantity || 0} />
                                                        <button className='flex text-2xl -mt-[0.5rem]' onClick={() => cartUtils.incrementquantity(currentstate, product.product_id, dispatch)}>+</button>
                                                    </div>
                                                )


                                            }
                                            <h1 className='flex text-black text-md ml-[3.75rem] mt-4 md:mt-4 mr-[1rem] md:mr-[2rem] md:text-lg font-bold  mt-2 mr-10'>Price: {product.price}</h1>
                                        </div>

                                    </div>
                                </div>))
                        }
                        <div className='flex border  border-t-1  border-black bg-gradient-to-r from-white via-blue-100 to-blue-400 h-[5rem] w-full'>
                            <h2 className='flex text-lg md:text-2xl font-bold text-black items-center justify-center w-full mx-7'>
                                <span className='flex w-full '>Total Cart Value</span> <span className='flex'>${currentstate.totalcartvalue}</span></h2>
                        </div>

                    </div>

                </div>
                <div className='flex items-center w-full mt-[1rem]  justify-end p-4 md:-ml-[5rem] lg:-ml-[13rem] xl:-ml-[18rem]'>
                    <button className='flex text-xl font-bold text-white bg-blue-700 border border-2 border-blue-900 mt-4 rounded rounded-md p-2' onClick={handleplaceorder}>Place Order</button>
                </div>
            </div>
        </div>
    )

}

export default Cart