import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { Context } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { handle_home } from './actions';



const Categories = () => {
    const currentstate = useSelector((state) => state);
    const dispatch = useDispatch();
    const menus = ['Mobiles', 'Dresses', 'Electronics', 'Furnitures', 'Toys', 'Groceries', 'Books']
    const handlecategories = (item) => {
        console.log(item)
        const category_values = {
            ...currentstate,
            isMenuVisible: false, showcart: false,
            login: false, productsdesc: false, signup: false, placeorder: false, iscategorylist: item, ishome: false

        }

        dispatch(handle_home(category_values))
    }

    return (
        <div className='fixed inset h-[100vh] -mt-10 -ml-10  bg-slate-900 w-[300px] z-200'>
            <ul className='flex flex-col absolute  w-full items-center justify-center mt-[5rem] sm:mt-[2rem] '>
                <div className='flex flex-row w-full '>
                    <li className='flex text-2xl  font-bolder mt-[2.5rem] ml-[3.5rem] text-white '>Categories</li>

                </div>
                <div className='flex absolute flex-col w-full text-white mt-[34.5rem]  mb-2'>

                    {
                        menus.map((item, index) => (
                            <div className='flex  w-100 h-[50px] hover:bg-pink-500 hover:cursor-pointer flex-col text-white mt-2 mb-2 items-center justify-center' key={index} onClick={() => handlecategories(item)}>{item}</div>
                        ))}
                </div>
            </ul >
        </div >
    )
}

export default Categories