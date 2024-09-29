import React from 'react'
import { useSelector } from 'react-redux';

const YourOrder = () => {
    const currentstate = useSelector((state) => state);
    const cartitems = currentstate.currentcart_txns;
    const address = 'B204,Happiness Towers,Pacifica Aurum,Padur,Chennai-603103.'
    const contact = '+91 6383736132'
    const username = 'Indumathi.S'

    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>
            <div className='flex flex-grow relative min-h-screen min-w-screen flex-col justify-center items-center bg-[linear-gradient(45deg,_#4db6ac,_#80cbc4,_#4fc3f7,_#64b5f6,_#9575cd)] mt-[7rem] lg:mt-[3rem]'>
                <div className="flex flex-row ribbon absolute text-center mx-auto justify-between -ml-[3rem] md:-mt-[15rem] lg:mt-[20rem]">
                    <div className='flex  text-black flex-grow text-2xl h-auto w-full font-bold -mt-[28rem] underline p-5'>ORDER SUMMARY</div>
                </div>
                <div className='flex absolute -mt-[35rem] flex-grow w-full md:-mt-[50rem] lg:-mt-[17rem] '>
                    <div className='flex flex-col justify-center text-sm m-4 sm:m-10 '>
                        <div className='flex  font-bold'>Delivering To:</div>
                        <div className='flex   font-bold '>{username}</div>
                        <div className='flex'>{address}</div>
                        <div className='flex flex-row'>
                            <div className='flex font-bold'>Mobile Number: </div>
                            <div className='flex'>&nbsp;{contact}</div>
                        </div>
                    </div>

                    <div className='flex absolute  flex-grow h-full w-1/2  mt-[15rem] flex-col mx-auto justify-center items-center p-4 ml-6'>

                        {
                            cartitems.map(product => (
                                <div className='flex flex-row bg-white border border-1 border-black m-1/2 h-[10rem] w-full '>
                                    <img className='object-cover hover:scale-105 h-[7rem] w-[6rem] md:h-[9rem] md:w-[10rem] p-2' src={product.image_link} alt={product.product_name} />
                                    <div className='flex flex-col ml-2 md:ml-5 w-full'>
                                        <h1 className='flex text-black text-md md:text-2xl font-bold mt-2'>{product.product_name}</h1>
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



export default YourOrder