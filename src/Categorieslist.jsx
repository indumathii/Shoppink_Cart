import React, { useContext, useEffect } from 'react'
import * as cartUtils from './cartutils';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';
import { useDispatch, useSelector } from 'react-redux';
import httpclient from './Axios';
import { handle_home, products_dispatch, setinitialstate, update_gender } from './actions';

const Categorieslist = () => {
    const currentstate = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* category_product = currentstate.productitems.filter(item =>
        item.category === currentstate.iscategorylist  
    );*/
    let current_product_1 = [];
    useEffect(() => {
        const fetchProducts = async () => {
            console.log("inside useeffect", currentstate.ismen)
            console.log("inside useeffect", currentstate.iswomen)
            console.log("inside useeffect", currentstate.isall)
            let current_gender_product = [];
            console.log("current state in Categorieslist", currentstate)
            console.log("current state of Categorieslist", currentstate.iscategorylist)
            //const currentstate.temp_products[0]. = currentstate.productitems.filter(item => item.product_id === product.product_id)
            const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id}`)
            const products_json = response.data;
            const products1 = products_json.filter(item => item.category === currentstate.iscategorylist)
            const products2 = currentstate.productitems.filter(item => {
                return item.category === currentstate.iscategorylist &&
                    !products1.some(product => product.product_id === item.product_id);
            });
            console.log("products res data in categories list json", products1)
            console.log("products res data in categories list products2", products2)
            console.log("printing length of products json", Object.keys(products1).length)
            if (currentstate.isloggedin) {
                console.log("user logged in category")
                if (Object.keys(products1).length > 0) {
                    console.log("inside if of categorilist")
                    const updatedProducts2 = products2.map(item => ({
                        ...item,
                        order_quantity: 0,
                        cart_status: "Add to cart",
                        order_status: 'New',
                        user_id: currentstate.currentuser.id,
                        txn_id: Math.floor(1000000000 + Math.random() * 9000000000),
                        iscategorytocart: true

                    }));
                    console.log("Updated products2:", updatedProducts2);
                    const updatedProducts1 = products1.map(item => ({
                        ...item,
                        iscategorytocart: item.order_quantity === 0 || item.cart_status === 'Add to Cart'

                    }));
                    console.log("updted products 1", updatedProducts1)
                    const concat_product = updatedProducts1.concat(updatedProducts2)
                    if (currentstate.iscategorylist === 'Dresses' && currentstate.ismen) {
                        console.log("inside if ismen fetchproducts")
                        current_gender_product = concat_product.filter(item => item.sub_category == 'Men Dresses')
                    }
                    else if (currentstate.iscategorylist === 'Dresses' && currentstate.iswomen) {
                        current_gender_product = concat_product.filter(item => item.sub_category == 'Women Dresses')
                    }
                    else {
                        current_gender_product = concat_product;
                    }

                    const updated_state = {
                        ...currentstate,
                        category_temp_products: current_gender_product
                    }
                    dispatch(setinitialstate(updated_state))

                }
                else {
                    console.log("inside else of categorilist")
                    const updatedProducts2 = products2.map(item => ({
                        ...item,
                        order_quantity: 0,
                        cart_status: "Add to cart",
                        order_status: 'New',
                        user_id: currentstate.currentuser.id,
                        txn_id: Math.floor(1000000000 + Math.random() * 9000000000),
                        iscategorytocart: true

                    }));

                    if (currentstate.iscategorylist === 'Dresses' && currentstate.ismen) {
                        current_gender_product = updatedProducts2.filter(item => item.sub_category == 'Men Dresses')
                    }
                    else if (currentstate.iscategorylist === 'Dresses' && currentstate.iswomen) {
                        current_gender_product = updatedProducts2.filter(item => item.sub_category == 'Women Dresses')
                    }
                    else {
                        current_gender_product = updatedProducts2;
                    }

                    const updated_state = {
                        ...currentstate,
                        category_temp_products: current_gender_product
                    }
                    dispatch(setinitialstate(updated_state))
                }

                console.log("final updated products in category_temp_products", currentstate.category_temp_products);
                console.log("final state in categorylist", currentstate)
            }

            else {
                console.log("user not logged in")
                const updatedProducts2 = products2.map(item => ({
                    ...item,
                    order_quantity: 0,
                    cart_status: "Add to cart",
                    order_status: 'New',
                    iscategorytocart: true

                }));

                if (currentstate.iscategorylist === 'Dresses' && currentstate.ismen) {
                    current_gender_product = updatedProducts2.filter(item => item.sub_category == 'Men Dresses')
                }
                else if (currentstate.iscategorylist === 'Dresses' && currentstate.iswomen) {
                    current_gender_product = updatedProducts2.filter(item => item.sub_category == 'Women Dresses')
                }
                else {
                    current_gender_product = updatedProducts2;
                }

                const updated_state = {
                    ...currentstate,
                    category_temp_products: current_gender_product
                }
                dispatch(setinitialstate(updated_state))

            }
        }
        fetchProducts();
    }, [currentstate.iscategorylist, currentstate.iswomen, currentstate.ismen, currentstate.isall, currentstate.isloggedin]);


    const handlemen = () => {
        const updated_value = {
            ...currentstate,
            ismen: true, iswomen: false, isall: false
        }
        dispatch(setinitialstate(updated_value))

    }
    const handlewomen = () => {
        const updated_value = {
            ...currentstate,
            iswomen: true, ismen: false, isall: false
        }
        dispatch(setinitialstate(updated_value))

    }
    const handleall = () => {
        const updated_value = {
            ...currentstate,
            isall: true, ismen: false, iswomen: false
        }
        dispatch(setinitialstate(updated_value))

    }


    useEffect(() => {
        console.log("current state after update in useeffect", currentstate.category_temp_products)
        console.log("currentstate handleall inside useeffect", currentstate.isall)
        console.log("currentstate handlewomen  inside useeffect", currentstate.iswomen)
        console.log("currentstate handlemen  inside useeffect", currentstate.ismen)
    }, [currentstate.category_temp_products, currentstate.iswomen, currentstate.ismen, currentstate.isall]);


    return (
        <>

            <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>

                <div className='flex min-screen  mt-[6rem] lg:mt-[2rem] text-5xl mx-auto  '>
                    <div>{currentstate.iscategorylist}</div>
                    {currentstate.iscategorylist === 'Dresses' &&
                        <div className='flex h-[2rem] w-[17rem] mt-[1rem] text-center items-center ml-[5rem] justify-between'>
                            <span className='flex border  border-2 border-black text-black text-xl bg-pink-400 font-bold hover:text-pink-600 hover:bg-white  hover:cursor-pointer rounded rounded-m p-1' onClick={handlemen}>Men</span>
                            <span className='flex border  border-2 border-black text-black text-xl bg-pink-400 font-bold rounded rounded-md  hover:text-pink-600 hover:bg-white  hover:cursor-pointer p-1' onClick={handlewomen}>Women</span>
                            <span className='flex border items-center text-center justify-center w-[3rem] border-2 border-black text-black text-xl bg-pink-400 font-bold rounded rounded-md  hover:text-pink-600 hover:bg-white  hover:cursor-pointer p-1' onClick={handleall}>All</span>
                        </div>}
                    <div className='absolute flex flex-grow mt-[7rem] md:mt-[2rem]  w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 top-[5rem] p-4 place-items-center gap-4 border border-black mx-auto  ml-[1rem]'>



                        {currentstate.category_temp_products.map(product => (

                            <div key={product.product_id} className="flex flex-grow flex-col border border-2 border-pink-500  h-[20rem] w-[14rem] items-center sm:w-[17rem] md:h-[20rem] md:w-[13rem] lg:w-[12rem] xl:w-[15rem] rounded rounded-md bg-[#F8F4FF] m-4 " >
                                <div className='flex mt-3 w-full justify-center items-start hover:cursor-pointer flex-col' onClick={() => cartUtils.handleproductsdesc(currentstate, dispatch, product.product_id, navigate)}>
                                    <div className='flex p-2 h-full w-full flex-col items-start  justify-center'>
                                        <img className='h-[10rem] w-[10rem] object-contain hover:scale-105 w-[10rem] ml-5' src={product.image_link} alt='image not available' />
                                        <h1 className='flex text-indigo-800 font-bold text-sm ml-1 mt-2 hover:underline'>{product.product_name}</h1>

                                    </div>
                                </div>
                                <div className='flex flex-row w-full justify-center items-center -mt-[1rem] h-full'>
                                    <h1 className='flex text-black text-xl font-medium top[-3rem] md:ml-[1rem] -mt-[0.5rem] ml-[2rem]'>{product.price}</h1>
                                    {currentstate.isloggedin ? (

                                        (product.iscategorytocart) ? (
                                            <button className='flex bg-white border ml-[2rem] justify-center text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded p-2' onClick={() => cartUtils.addtocart(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>
                                                Add to Cart
                                            </button>
                                        ) :
                                            (
                                                <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem] items-center'>
                                                    <button className='flex text-3xl text-black' onClick={() => cartUtils.decrementquantity(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>-</button>
                                                    <input type="text" className='flex text-sm text-black h-[1.5rem] w-[2rem] border border-black text-center' value={product.order_quantity} />
                                                    <button className='flex text-2xl text-black' onClick={() => cartUtils.incrementquantity(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>+</button>
                                                </div>
                                            )) : (
                                        (product.iscategorytocart) ? (
                                            <button className='flex bg-white border ml-[2rem] justify-center text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded p-2' onClick={() => cartUtils.addtocart(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>
                                                Add to Cart
                                            </button>
                                        ) :
                                            (
                                                <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem] items-center'>
                                                    <button className='flex text-3xl text-black' onClick={() => cartUtils.decrementquantity(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>-</button>
                                                    <input type="text" className='flex text-sm text-black h-[1.5rem] w-[2rem] border border-black text-center' value={product.order_quantity} />
                                                    <button className='flex text-2xl text-black' onClick={() => cartUtils.incrementquantity(currentstate, currentstate.temp_products, 'cart', product.product_id, dispatch)}>+</button>
                                                </div>
                                            )


                                    )
                                    }


                                </div>


                            </div>

                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default Categorieslist