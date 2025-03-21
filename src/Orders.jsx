import React from 'react'
import { useContext } from 'react';
import bow from './bow.svg'
import { Context } from './App';
import { useSelector } from 'react-redux';

const Orders = () => {
    const currentstate = useSelector((state) => state);
    const cartitems = currentstate.currentcart_txns.filter(txns => txns.cart_status = 'Remove from Cart');
    console.log("inside orders current cart txns", cartitems)
    const address = currentstate.currentuser.address
    const contact = '+91 6383736132'
    const username = 'Indumathi.S'

    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>
            <div className='flex flex-grow relative min-h-screen mt-[5rem] w-[80vw] flex-col justify-center items-center bg-white lg:mt-[3rem]'>
                <div className="flex flex-row bg-red-500 mt-[1rem] sm:mt-[2rem] ribbon absolute text-center mx-auto justify-between -ml-[3rem] md:-mt-[15rem] lg:-mt-[20rem] xl:mt-[20rem]">
                    <div className='flex text-black flex-grow text-2xl h-auto w-full font-bold -mt-[28rem] underline p-5'>ORDER SUMMARY</div>
                </div>
                <div className='flex absolute -mt-[35rem] flex-grow w-[80vw] md:-mt-[50rem] lg:-mt-[55rem] xl:-mt-[15rem] '>
                    <div className='flex flex-col justify-center text-sm m-4 sm:m-10 '>
                        <div className='flex flex-col -ml-7'>
                            <div className='flex  font-bold'>Delivering To:</div>
                            <div className='flex   font-bold text-red-600'>{currentstate.currentuser.firstname}&nbsp;{currentstate.currentuser.lastname}</div>
                            <div className='flex text-left font-medium '>Address:</div>
                            <div className='flex text-left'>{address.trim()}</div>
                            <div className='flex flex-row'>
                                <div className='flex font-medium'>Mobile Number: </div>
                                <div className='flex font-medium'>&nbsp;+{currentstate.currentuser.mobile}</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-grow min-h-screen w-[80vw] -ml-[20rem] mt-[65rem] md:mt-[100rem] lg:mt-[120rem] xl:mt-[75rem] flex-col mx-auto items-center p-4 ml-6'>

                        {
                            cartitems.map(product => (
                                <div className='flex flex-col md:flex-row border-black mb-[17rem] md:mb-[10rem] h-[10rem] w-full md:-mt-[8rem]'>
                                    <img className='object-cover hover:scale-105 h-[140rem] w-[15rem] md:h-[9rem] md:w-[10rem] p-2' src={product.image_link} alt={product.product_name} />
                                    <div className='flex flex-col ml-2 md:ml-5 w-full'>
                                        <h1 className='flex text-black text-md md:text-xl font-bold mt-2'>{product.product_name}</h1>
                                        <h1 className='flex italic text-black text-sm font-bold text-red-600 mt-5 ml-[2rem]'>Arriving on {`${new Date(new Date().setDate(new Date().getDate() + product.days_of_delivery)).getDate()}${["th", "st", "nd", "rd"][(new Date().getDate() + product.days_of_delivery) % 10 > 3 ? 0 : (new Date().getDate() + product.days_of_delivery) % 10]} ${new Date(new Date().setDate(new Date().getDate() + product.days_of_delivery)).toLocaleString('default', { month: 'long' })}`}</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders