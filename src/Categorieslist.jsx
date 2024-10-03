import React, { useContext, useEffect } from 'react'
import * as cartUtils from './cartutils';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';
import { useDispatch, useSelector } from 'react-redux';
import httpclient from './Axios';
import { products_dispatch } from './actions';

const Categorieslist = () => {
    const currentstate = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* category_product = currentstate.productitems.filter(item =>
        item.category === currentstate.iscategorylist  
    );*/
    let current_product = []


    useEffect(() => {
        const fetchProducts = async (currentstate) => {
            console.log("current state in Categorieslist", currentstate)
            console.log("current state of Categorieslist", currentstate.iscategorylist)
            //const currentstate.temp_products[0]. = currentstate.productitems.filter(item => item.product_id === product.product_id)
            const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id}`)
            const products_tmp = response.data;
            console.log("products_tmp", products_tmp)
            const products = products_tmp.filter(item => item.category === currentstate.iscategorylist)
            console.log("products res data in categories list", products)
            console.log("printing length of products", Object.keys(products).length)
            if (Object.keys(products).length > 0) {
                console.log("inside if of categorilist")
                current_product = products
                current_product.forEach(product => product.iscategorytocart = product.order_quantity === 0 || product.cart_status === 'Add to Cart');
                console.log("current product in if categorilist ", current_product)
            }
            else {
                console.log("inside else of categorilist")
                current_product = currentstate.productitems.filter(item => item.category === currentstate.iscategorylist)
                current_product.forEach(product => product.iscategorytocart = true);
            }
            console.log("current product in categorilist", current_product)
            const defaultvalues = {
                ...currentstate,
                category_temp_products: current_product
            }
            console.log("temp products assigned in state", defaultvalues)
            dispatch(products_dispatch(defaultvalues))

        };

        fetchProducts(currentstate);
    }, []);
    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>

            <div className='flex min-screen  mt-[6rem] lg:mt-[2rem] text-5xl mx-auto  '>
                <div>{currentstate.iscategorylist}</div>
                <div className='absolute flex flex-grow mt-[7rem] md:mt-[2rem]  w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 top-[5rem] p-4 place-items-center gap-4 border border-black mx-auto  ml-[1rem]'>
                    {

                        currentstate.category_temp_products.map(product => (

                            <div key={product.product_id} className="flex flex-grow flex-col border border-2 border-pink-500  h-[20rem] w-[14rem] items-center sm:w-[17rem] md:h-[20rem] md:w-[13rem] lg:w-[12rem] xl:w-[15rem] rounded rounded-md bg-[#F8F4FF] m-4 " >
                                <div className='flex mt-3 w-full justify-center items-start hover:cursor-pointer flex-col' onClick={() => cartUtils.handleproductsdesc(currentstate, product.product_id, navigate)}>
                                    <div className='flex p-2 h-full w-full flex-col items-start  justify-center'>
                                        <img className='h-[10rem] w-[10rem] object-contain hover:scale-105 w-[10rem] ml-5' src={product.image_link} alt='image not available' />
                                        <h1 className='flex text-indigo-800 font-bold text-sm ml-1 mt-2 hover:underline'>{product.product_name}</h1>

                                    </div>
                                </div>
                                <div className='flex flex-row w-full justify-center items-center -mt-[1rem] h-full'>
                                    <h1 className='flex text-black text-xl font-medium top[-3rem] md:ml-[1rem] -mt-[0.5rem] ml-[2rem]'>{product.price}</h1>
                                    {currentstate.category_temp_products.find(item => item.product_id === product.product_id)?.iscategorytocart ? (
                                        <button className='flex bg-white border ml-[2rem] justify-center text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded p-2' onClick={() => cartUtils.addtocart(currentstate, product.product_id, dispatch)}>
                                            Add to Cart
                                        </button>
                                    ) :
                                        (
                                            <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem] items-center'>
                                                <button className='flex text-3xl text-black' onClick={() => cartUtils.decrementquantity(currentstate, product.product_id, dispatch)}>-</button>
                                                <input type="text" className='flex text-sm text-black h-[1.5rem] w-[2rem] border border-black text-center' value={currentstate.usertxn.find(txn => txn.user_id === currentstate.currentuser.id && txn.product_id === product.product_id)?.order_quantity || 0} />
                                                <button className='flex text-2xl text-black' onClick={() => cartUtils.incrementquantity(currentstate, product.product_id, dispatch)}>+</button>
                                            </div>
                                        )
                                    }


                                </div>


                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )

}

export default Categorieslist