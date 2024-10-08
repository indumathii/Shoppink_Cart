import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { setinitialstate } from './actions';
import httpclient from './Axios';
import { useDispatch } from 'react-redux';


const YourOrder = () => {
    const currentstate = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchdata = async (currentstate) => {
            const res = await httpclient.get(`txns/orders/${currentstate.currentuser.id}`);
            const usr_txns = res.data;
            const currentuser_txns = usr_txns.filter(txn => txn.user_id === currentstate.currentuser.id && txn.order_status.toUpperCase() !== 'NEW');
            console.log("printing currentusertxn in yourorder", currentuser_txns)
            const updated_state = {
                ...currentstate,
                currentcart_txns: currentuser_txns,
            };

            dispatch(setinitialstate(updated_state))
            window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
            console.log("printing final updated state in your order", currentstate)

        }
        fetchdata(currentstate);
    }, []);


    return (
        <div className={`${currentstate.isMenuVisible ? 'relative -z-10' : 'relative'} `}>
            <div className='flex flex-grow relative min-h-screen w-[80vw] flex-col justify-center items-center bg-[linear-gradient(45deg,_#4db6ac,_#80cbc4,_#4fc3f7,_#64b5f6,_#9575cd)] mt-[7rem] lg:mt-[3rem]'>

                <div className='flex  text-black flex-grow text-2xl h-auto w-full font-bold justify-center  items-center underline p-5'>ORDER HISTORY</div>

                <div className='flex  pb-10 mb-10 md:ml-[0rem] flex-grow w-1/2 md:w-full md:mt-[2rem] lg:-mt-[11rem] '>
                    <div className='flex flex-grow h-full w-full  mt-[7rem] flex-col items-center p-4 md:ml-6 md:mt-[10rem]'>

                        {
                            currentstate.currentcart_txns.map(product => (
                                <div className='flex flex-col md:flex-row bg-white mb-[10rem] h-[20rem] w-[15rem] mb-[1rem] md:w-3/4 md:h-[15rem]'>
                                    <img className='object-contain hover:scale-105 h-[15rem] w-[10rem] md:h-[15rem] md:w-[10rem] p-2' src={product.image_link} alt={product.product_name} />
                                    <div className='flex  flex-col  w-full md:mt-[5rem] md:ml-[3rem]'>
                                        <h1 className='flex text-black text-xs md:text-md font-bold mt-2 mb-2'>{product.product_name}</h1>
                                        <h1 className='flex text-sm font-bold italic text-red-600 ml-[2rem] md:mt-[2rem]  mb-2'>Arriving on {`${new Date(Date.now() + product.days_of_delivery * 24 * 60 * 60 * 1000).getDate()}${(day => (day > 3 && day < 21) ? 'th' : ['th', 'st', 'nd', 'rd'][day % 10] || 'th')(new Date(Date.now() + product.days_of_delivery * 24 * 60 * 60 * 1000).getDate())} ${new Date(Date.now() + product.days_of_delivery * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long' })}`}</h1>
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