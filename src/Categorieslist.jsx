import React, { useContext } from 'react'
import * as cartUtils from './cartutils';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';


const Categorieslist = () => {
    const { contextvalues, setcontextvalues } = useContext(Context);
    const navigate = useNavigate();
    const category_product = contextvalues.productitems.filter(item =>
        item.p_category === contextvalues.iscategorylist ||
        item.sub_category === contextvalues.iscategorylist
    );
    return (
        <div className={`${contextvalues.isMenuVisible ? 'relative -z-10' : 'relative'} `}>

            <div className='flex min-screen  mt-[6rem] lg:mt-[2rem] text-5xl mx-auto  '>
                <div>{contextvalues.iscategorylist}</div>
                <div className='absolute flex flex-grow mt-[7rem] md:mt-[2rem]  w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 top-[5rem] p-4 place-items-center gap-4 border border-black mx-auto  ml-[1rem]'>
                    {

                        category_product.map(product => (

                            <div key={product.p_id} className="flex flex-grow flex-col border border-2 border-pink-500  h-[20rem] w-[14rem] items-center sm:w-[17rem] md:h-[20rem] md:w-[13rem] lg:w-[12rem] xl:w-[15rem] rounded rounded-md bg-[#F8F4FF] m-4 " >
                                <div className='flex mt-3 w-full justify-center items-start hover:cursor-pointer flex-col' onClick={() => cartUtils.handleproductsdesc(setcontextvalues, product.p_id, navigate)}>
                                    <div className='flex p-2 h-full w-full flex-col items-start ml-5'>
                                        <img className='object-cover hover:scale-105 w-[10rem] lg:w-[9rem]' src={product.p_img} alt={product.p_name} />
                                        <h1 className='flex text-red-500 text-2xl font-medium mt-2'>{product.p_name}</h1>

                                    </div>
                                </div>
                                <div className='flex flex-row w-full justify-center items-center -mt-[1rem] h-full'>
                                    <h1 className='flex text-black text-xl font-medium top[-3rem] md:ml-[1rem] -mt-[0.5rem] ml-[2rem]'>{product.p_price}</h1>
                                    {
                                        product.p_status === 'Add to Cart' && (
                                            <button className='flex bg-white border ml-[2rem] justify-center md:text-xs md:ml-[0.5rem] lg:ml-[3rem] -mt-[0.25rem] text-sm shadow-md border-1 border-black text-black font-medium rounded rounded-md p-1' onClick={() => cartUtils.addtocart(setcontextvalues, product.p_id)}>Add to Cart</button>
                                        )
                                    }
                                    {
                                        product.p_status === 'Remove from Cart' && (
                                            <div className='flex flex-row justify-between ml-[2rem] gap-2 w-[3rem] h-[2rem]  items-center'>
                                                <button className='flex text-3xl -mt-[0.5rem]' onClick={() => cartUtils.decrementquantity(setcontextvalues, product.p_id)} >-</button>
                                                <input type="text" className='flex text-sm h-[1.5rem] w-[2rem] border border-black text-center' value={product.quantity} />
                                                <button className='flex text-2xl -mt-[0.5rem]' onClick={() => cartUtils.incrementquantity(setcontextvalues, product.p_id)}>+</button>
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