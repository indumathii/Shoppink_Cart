import React, { useEffect, useState } from 'react'
import httpclient from './Axios';

const Dummy = () => {
    const [users, setusers] = useState([]);
    const [txns, settxns] = useState([]);


    /*useEffect(() => {
        httpclient.get('/signup')
            .then(response => {
                console.log(response.data); // Should show data in the console
                setusers(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []*/


    useEffect(() => {
        httpclient.get('/txns')
            .then(response => {
                console.log(response.data); // Should show data in the console
                settxns(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []

    )
    return (
        <div className='flex h-[90vh] w-[80vw] bg-green-500 mt-[6rem]'>
            <div className="flex flex-col h-[20rem] w-[30rem]" >
                {
                    txns.map(txns => (

                        <div className='flex flex-row h-[5rem] w-[25rem] bg-pink-500 p-4'>
                            <div key={txns.user_id} className="flex  border border-1 border-black p-2" >{txns.user_id}</div>
                            <div className='flex border border-1 border-black p-2 '>{txns.product_id}</div>
                            <div className='flex border border-1 border-black p-2 '>{txns.txn_id}</div>
                            <div className='flex border border-1 border-black p-2 '>{txns.order_quantity}</div>
                            <div className='flex border border-1 border-black p-2 '>{txns.cart_status}</div>
                            <div className='flex border border-1 border-black p-2 '>{txns.order_status}</div>
                        </div>

                    ))
                }
            </div>
        </div>

    )
}

export default Dummy