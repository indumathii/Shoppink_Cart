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
            <div className='flex flex-grow relative min-h-screen min-w-screen flex-col justify-center items-center bg-[linear-gradient(45deg,_#4db6ac,_#80cbc4,_#4fc3f7,_#64b5f6,_#9575cd)] mt-[7rem] lg:mt-[3rem]'>

                <div className='flex  text-black flex-grow text-2xl h-auto w-full font-bold justify-center  items-center underline p-5'>ORDER HISTORY</div>

                <div className='flex  pb-10 mb-10 md:-ml-[35rem] flex-grow w-1/2 md:-mt-[40rem] lg:-mt-[11rem] '>
                    <div className='flex flex-grow h-full w-1/2  mt-[15rem] flex-col mx-auto justify-center items-center p-4 ml-6'>

                        {
                            currentstate.currentcart_txns.map(product => (
                                <div className='flex flex-row bg-white m-1/2 h-[10rem] w-full mb-2'>
                                    <img className='object-cover hover:scale-105 h-[7rem] w-[6rem] md:h-[9rem] md:w-[10rem] p-2' src={product.image_link} alt={product.product_name} />
                                    <div className='flex  flex-col ml-2 md:ml-5 w-full'>
                                        <h1 className='flex text-black text-md md:text-md font-bold mt-2'>{product.product_name}</h1>
                                        <h1 className='flex text-black text-sm font-bold italic text-red-600 mt-[3rem] ml-[12rem]'>Arriving on {`${new Date(new Date().setDate(new Date().getDate() + product.days_of_delivery)).getDate()}${["th", "st", "nd", "rd"][(new Date().getDate() + product.days_of_delivery) % 10 > 3 ? 0 : (new Date().getDate() + product.days_of_delivery) % 10]} ${new Date(new Date().setDate(new Date().getDate() + product.days_of_delivery)).toLocaleString('default', { month: 'long' })}`}</h1>
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