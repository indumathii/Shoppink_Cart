import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as cartUtils from './cartutils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Context } from './App';


const ProductsDescription = () => {
    const { contextvalues, setcontextvalues } = useContext(Context);
    const { p_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const product = contextvalues.productitems.find(item => item.p_id === parseInt(p_id, 10));
    console.log("p_id", p_id);

    /* useEffect(() => {
         // Function to handle the popstate event
         const handlePopState = () => {
             if (location.pathname.startsWith('/productsdesc')) {
                 setcurrentpid(null)
                 setproductsdesc(false)
                 navigate('/home')
             }
         };
 
         // Add event listener
         window.addEventListener('popstate', handlePopState);
 
         // Cleanup event listener on component unmount
         return () => {
             window.removeEventListener('popstate', handlePopState);
         };
     }, []);*/


    return (
        <div className={`${contextvalues.isMenuVisible ? 'relative -z-10' : 'relative'} `}>
            <div className='h-[80vh] fixed inset-0  w-[90vw] md:w-[80vw] sm:w-[80vw] md:mt-15 bg-pink-200 mx-auto mt-[7rem] md:mt-[5rem]'>
                <div className='h-full w-full p-10 flex'>
                    <div className='flex flex-col sm:flex-col lg:flex-row items-start'>
                        <img className='flex h-[30vh] sm:h-[25vh] md:h-[25vh] lg:h-[35vh]' src={product.p_img} alt={product.p_name} />
                        <div className='flex flex-col ml-[2rem] items-start'>
                            <h1 className='flex text-black text-3xl font-bold '>{product.p_name}</h1>
                            <div className='product-rating text-xs mt-[0.5rem] text-left' id={product.p_id}>
                                {(() => {
                                    const stars = [];
                                    for (let i = 0; i < product.p_rating; i++) {
                                        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: '#CC5500' }} />);
                                    }
                                    return stars;
                                })()}
                            </div>
                            <h1 className='flex text-xs italic text-left'>{product.p_sales}</h1>
                            <p className='flex mt-[1rem] text-left'>{product.p_desc}</p>
                            <div className='flex mt-[5rem] items-start justify-center -ml-[1rem]'>
                                <h1 className='flex text-black text-2xl font-medium top[-3rem]  md:ml-[1rem] '>{product.p_price}</h1>
                                {
                                    product.p_status === 'Add to Cart' && (
                                        <button className='flex bg-white border ml-[2rem] justify-center md:text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-md shadow-md border-1 border-black text-black font-bold rounded rounded-md p-3' onClick={() => cartUtils.addtocart(setcontextvalues, product.p_id)}>Add to Cart</button>
                                    )
                                }
                                {
                                    product.p_status === 'Remove from Cart' && (
                                        <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem]  items-center'>
                                            <button className='flex text-3xl text-black -mt-[0.5rem]' onClick={() => cartUtils.decrementquantity(setcontextvalues, product.p_id)} >-</button>
                                            <input type="text" className='flex text-md text-black h-[1.5rem] w-[2rem] border border-black text-center' value={product.quantity} />
                                            <button className='flex text-2xl text-black -mt-[0.5rem]' onClick={() => cartUtils.incrementquantity(setcontextvalues, product.p_id)}>+</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductsDescription