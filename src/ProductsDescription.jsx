import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as cartUtils from './cartutils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Context } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { products_dispatch } from './actions';
import httpclient from './Axios';


const ProductsDescription = () => {
    const currentstate = useSelector((state) => state);
    const dispatch = useDispatch();
    const { p_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    let current_product = [];

    console.log("p_id", p_id);
    useEffect(() => {
        const fetchProducts = async (currentstate) => {
            console.log("current state in producdesc", currentstate)
            //const currentstate.temp_products[0]. = currentstate.productitems.filter(item => item.product_id === parseInt(p_id))

            if (currentstate.isloggedin) {
                const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id}`)
                const products_tmp = response.data;
                const products = products_tmp.filter(item => item.product_id === parseInt(p_id))
                console.log("products res data", products)
                console.log("printing length of products", Object.keys(products).length)
                if (Object.keys(products).length > 0) {
                    console.log("inside if of desc")
                    const current_product_tmp = products_tmp.filter(item => item.product_id === parseInt(p_id))
                    console.log("current product in if desc", current_product)
                    current_product = current_product_tmp.map(item => ({
                        ...item,
                        isaddtocart: (item.order_quantity > 0 && item.cart_status == 'Remove from Cart') ? false : true
                    }));
                    const defaultvalues = {
                        ...currentstate,
                        temp_products: current_product
                    }

                    console.log("current product", current_product)
                    dispatch(products_dispatch(defaultvalues))
                }
                else {
                    const current_product_tmp = currentstate.productitems.filter(item => item.product_id === parseInt(p_id))
                    current_product = current_product_tmp.map(item => ({
                        ...item,
                        cart_status: 'Add to Cart',
                        order_status: 'New',
                        order_quantity: 0,
                        isaddtocart: true
                    }));
                    const defaultvalues = {
                        ...currentstate,
                        temp_products: current_product
                    }
                    console.log("current product tmp", current_product_tmp)
                    console.log("current product", current_product)
                    dispatch(products_dispatch(defaultvalues))
                }
            }
            else {
                console.log("inside else of desc iloggedin no")
                const current_product_tmp = currentstate.productitems.filter(item => item.product_id === parseInt(p_id))
                current_product = current_product_tmp.map(item => ({
                    ...item,
                    cart_status: 'Add to Cart',
                    order_status: 'New',
                    order_quantity: 0,
                    isaddtocart: true
                }));
                const defaultvalues = {
                    ...currentstate,
                    temp_products: current_product
                }
                console.log("current product tmp", current_product_tmp)
                console.log("current product", current_product)
                dispatch(products_dispatch(defaultvalues))
            }
        };

        fetchProducts(currentstate);
    }, [currentstate.temp_products.cart_status, currentstate.temp_products.order_quantity, currentstate.isloggedin]);

    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'}`}>
            <div className='h-[80vh] inset-0 w-[90vw] md:w-[80vw] sm:w-[80vw] md:mt-15 bg-pink-200 mx-auto mt-[7rem] md:mt-[5rem]'>
                <div className='h-full w-full p-10 flex'>
                    <div className='flex flex-col sm:flex-col lg:flex-row items-start'>
                        {currentstate.temp_products.length > 0 && (
                            <>
                                <img className='flex h-[30vh] sm:h-[25vh] md:h-[25vh] lg:h-[35vh]' src={currentstate.temp_products[0].image_link} alt={currentstate.temp_products[0].product_name} />
                                <div className='flex flex-col ml-[2rem] items-start'>
                                    <h1 className='flex text-black text-xl font-bold'>{currentstate.temp_products[0].product_name}</h1>
                                    <div className='product-rating text-xs mt-[0.5rem] text-left' id={currentstate.temp_products[0].product_id}>
                                        {(() => {
                                            const stars = [];
                                            for (let i = 0; i < currentstate.temp_products[0].rating; i++) {
                                                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: '#CC5500' }} />);
                                            }
                                            return stars;
                                        })()}
                                    </div>
                                    <h1 className='flex text-xs italic text-left'>{currentstate.temp_products[0].sales}</h1>
                                    <p className='flex mt-[1rem] text-left'>{currentstate.temp_products[0].product_description}</p>
                                    <div className='flex mt-[5rem] items-start justify-center -ml-[1rem]'>
                                        <h1 className='flex text-black text-2xl font-medium md:ml-[1rem]'>{currentstate.temp_products[0].price}</h1>
                                        {currentstate.isloggedin ? (
                                            currentstate.temp_products[0].isaddtocart ? (
                                                <button className='flex bg-white border ml-[2rem] justify-center md:text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded p-3' onClick={() => cartUtils.addtocart(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>
                                                    {currentstate.usertxn.find(txn => txn.user_id === currentstate.currentuser.id && txn.product_id === p_id)?.order_quantity > 0 && currentstate.temp_products[0].find(txn => txn.user_id === currentstate.currentuser.id && txn.product_id === parseInt(p_id))?.order_status !== 'Placed' ? 'Remove from Cart' : 'Add to Cart'}
                                                </button>
                                            ) :
                                                (
                                                    <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem] items-center'>
                                                        <button className='flex text-3xl text-black' onClick={() => cartUtils.decrementquantity(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>-</button>
                                                        <input type="text" className='flex text-md text-black h-[1.5rem] w-[2rem] border border-black text-center' value={currentstate.usertxn.find(txn => txn.user_id === currentstate.currentuser.id && txn.product_id === parseInt(p_id))?.order_quantity || 0} />
                                                        <button className='flex text-2xl text-black' onClick={() => cartUtils.incrementquantity(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>+</button>
                                                    </div>
                                                )) : (currentstate.temp_products[0].isaddtocart ? (
                                                    <button className='flex bg-white border ml-[2rem] justify-center md:text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded p-3' onClick={() => cartUtils.addtocart(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>
                                                        Add to Cart
                                                    </button>
                                                ) :
                                                    (
                                                        <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem] items-center'>
                                                            <button className='flex text-3xl text-black' onClick={() => cartUtils.decrementquantity(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>-</button>
                                                            <input type="text" className='flex text-md text-black h-[1.5rem] w-[2rem] border border-black text-center' value='2' />
                                                            <button className='flex text-2xl text-black' onClick={() => cartUtils.incrementquantity(currentstate, currentstate.temp_products, 'product_desc', parseInt(p_id), dispatch)}>+</button>
                                                        </div>
                                                    ))
                                        }
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}
export default ProductsDescription