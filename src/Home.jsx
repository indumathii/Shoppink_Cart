import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faSignOutAlt, faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import * as cartUtils from './cartutils';
import Categories from './Categories';
import { Context } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { handlelogins, setinitialstate, handlememberlists, handlesign_out } from './actions';

const Home = () => {

    const navigate = useNavigate();

    const [contextvalues, setcontextvalues] = useState();
    const currentstate = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {

        window.localStorage.setItem('shoppink-store', JSON.stringify(currentstate));

    }, [currentstate]);
    useEffect(() => {

        const savedStateString = window.localStorage.getItem('shoppink-store');
        if (savedStateString) {
            const savedState = JSON.parse(savedStateString);
            console.log("printing savedstate from home localstorage", savedState)
            dispatch(setinitialstate(savedState))
        }
    }, []);

    useEffect(() => {
        console.log("Current state updated", currentstate);
    }, [currentstate]);


    const togglemenu = () => {
        //setcontextvalues(prev => ({ ...prev, isMenuVisible: !prev.isMenuVisible }))
        console.log(currentstate.isMenuVisible)
    }

    const handlehome = () => {
        /*if (contextvalues) {

            const update_values = {
                ...contextvalues,
                productsdesc: false,
                signup: false,
                placeorder: false, iscategorylist: false, showcart: false,
                currentTime: new Date().toLocaleTimeString(), ishome: true
            };
            setcontextvalues(update_values)
            window.localStorage.setItem('shoppink-state', JSON.stringify(update_values));
        }*/
    }


    const handlelogin = () => {

        //setcontextvalues(prev => ({ ...prev, login: !prev.login, ismemberlist: false, productsdesc: false, placeorder: false, iscategorylist: false, showcart: false }))
        const handle_login_values = {
            ...currentstate,
            login: !currentstate.login,
            ismemberlist: false,
            productsdesc: false, placeorder: false, iscategorylist: false, showcart: false

        }
        dispatch(handlelogins(handle_login_values))

    }
    const handlecart = () => {

        /*setcontextvalues(prev => ({
            ...prev, showcart: true,
            login: false, productsdesc: false, signup: false, placeorder: false, iscategorylist: false
        }))*/


    }
    const handlememberlist = () => {

        const handle_memberlist_values = {
            ...currentstate,
            ismemberlist: !currentstate.ismemberlist,

        }
        window.localStorage.setItem('shoppink-store', JSON.stringify(handle_memberlist_values));
        dispatch(handlememberlists(handle_memberlist_values));
        //setcontextvalues(prev => ({ ...prev, ismemberlist: !prev.ismemberlist }))

    }
    const handlesignout = () => {
        const handle_signout_values = {
            ...currentstate,
            ismemberlist: false,
            currentuser: {},
            usertxn: [],
            users: [],
            isloggedin: false,
            currentTime: new Date().toLocaleTimeString(),
            cartcount: 0
        };
        window.localStorage.setItem('shoppink-store', JSON.stringify(handle_signout_values));
        dispatch(handlesign_out(handle_signout_values))
    }

    useEffect(() => {

        if (currentstate.login) {

            navigate('/shoppink/login');
        }
        else if (currentstate.signup) {

            navigate('/shoppink/signup');
        }
        else if (currentstate.productsdesc) {
            console.log("inside productsdesc home", currentstate.productsdesc)
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            navigate(`/productsdesc/${currentstate.currentpid}`);

        }
        else if (currentstate.iscategorylist) {
            console.log('inside useeffect iscategorylist')
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            navigate(`/shoppink/categories/${currentstate.iscategorylist}`)

        }
        else if (currentstate.cartcount > 0 && currentstate.showcart) {

            console.log("inside showcart home")

            //setcontextvalues(prev => ({ ...prev, productsdesc: false }))
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            navigate('/shoppink/cart');



        }
        else if (currentstate.placeorder) {
            console.log("inside useeffect placeorder")
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            navigate('/shoppink/orders')
        }

        else if (currentstate.ishome) {
            console.log('inside ishome')
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            console.log("navigating to home 1")
            navigate('/home')
            //setcontextvalues(prev => ({ ...prev, currentpid: null }))


        }
        else {

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            console.log("navigating to home")
            navigate('/home');


            //setcontextvalues(prev => ({ ...prev, currentpid: null }))


        }

        //cartUtils.cartcountcalc(contextvalues, setcontextvalues)
        console.log(currentstate.isMenuVisible)


    }, [currentstate.login, currentstate.signup, currentstate.logsubmit, currentstate.signupsubmit, currentstate.productsdesc, currentstate.showcart, currentstate.cartcount, currentstate.ishome, currentstate.productitems, currentstate.settotalcartvalue, currentstate.totalcartvalue, currentstate.placeorder, currentstate.iscategorylist]);

    const handleuserorders = () => {

    }

    /*useEffect(() => {
        const temp_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
        setcontextvalues(temp_state)
        window.localStorage.setItem('shoppink-state', JSON.stringify(temp_state))
        //cartUtils.cartcountcalc(setcontextvalues)

    }, [currentstate.cartcount])*/
    return (
        <>
            <div className={`${currentstate.login || currentstate.signup ? 'fixed -z-10' : 'relative'}`}>
                <div className='flex  -ml-[2rem]'>
                    <nav className='flex h-[100px] z-10 w-full fixed top-0 left-0 bg-slate-900 sm:h-14 md:h-14 items-start md:items-center '>
                        <div className='flex flex-col w-full ml-2'>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex flex-row mx-2 items-center'>
                                    <button className='md:flex md:items-center mx-2 text-xl  font-bold ml-2'>
                                        <FontAwesomeIcon className='text-white hover:text-pink-500' icon={faBars} size="lg" onClick={togglemenu} />
                                    </button>
                                    <h2 className='md:flex md:items-center text-xl mx-2 md:text-3xl font-bold  text-pink-600'>Shoppink</h2>
                                    <h2 className='hidden md:hover:text-gray-500 md:h-[1.5rem] md:mt-1 md:hover:cursor-pointer md:hover:scale-110 md:ml-[2rem] md:bg-white rounded rounded-md md:flex md:items-center text-sm mx-2 md:text-sm font-bold text-black p-1' onClick={handlehome}>Home</h2>
                                </div>

                                <span className='flex'>
                                    <ul className=' flex flex-row text-xs md:text-sm font-bold  text-white px-1 m-4'>

                                        {


                                            currentstate.currentuser && currentstate.currentuser.firstname ? (
                                                <>
                                                    <li className='flex mr-1 mt-1 text-pink-500  '>{currentstate.currentuser.firstname}</li>
                                                    <li className='flex mr-6 text-pink-500 cursor-pointer' onClick={handlememberlist}> <FontAwesomeIcon icon={faUser} size="2x" /> </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className='flex mr-6 hover:text-pink-500 text-white cursor-pointer' onClick={handlelogin}> <FontAwesomeIcon icon={faUser} size="2x" /> </li>
                                                </>
                                            )
                                        }

                                        <div className='flex' onClick={handlecart}>
                                            <li className='flex mx-1 hover:text-pink-500 cursor-pointer'> <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                                                {currentstate.cartcount != 0 && (<h1 className='absolute -mt-3 ml-2 flex text-black rounded rounded-full items-center justify-center bg-pink-400 font-bold text-md h-[1.5rem] w-[1.5rem]'>{currentstate.cartcount}</h1>)}</li>
                                        </div>
                                    </ul>
                                </span>
                            </div>
                            <div className='md:hidden relative sm:hidden lg:hidden flex justify-center items-center w-full'>

                                <h2 className=' hover:text-gray-500 h-[1.5rem] mt-2 hover:cursor-pointer hover:scale-110 -ml-[12rem] bg-white rounded rounded-md md:flex md:items-center text-sm mx-2 md:text-sm font-bold text-black p-1' onClick={handlehome}>Home</h2>
                            </div>
                        </div>
                    </nav>
                    {currentstate.ismemberlist && (

                        <div className='flex flex-col fixed text-white mt-[4rem] md:mt-[1rem] text-sm md:text-xl ml-[12rem] md:ml-[67rem] bg-slate-900 h-[20rem] w-[11.95rem]'>
                            <div className='flex flex-row  w-full h-[45px] hover:bg-pink-500 hover:cursor-pointer items-center justify-center p-2 text-white' onClick={handlesignout}>
                                <FontAwesomeIcon icon={faBox} className='transform mt-[0.3rem] text-sm mr-2 rotate-180 items-center' />
                                <span className='flex'>Your Orders</span>
                            </div>
                            <div className='flex flex-row  w-full h-[45px] hover:bg-pink-500 hover:cursor-pointer items-center justify-center p-2 text-white' onClick={handlesignout}>
                                <FontAwesomeIcon icon={faSignOutAlt} className='transform mt-[0.3rem] text-sm mr-2 rotate-180 items-center' />
                                <span className='flex'>Sign Out</span>
                            </div>

                        </div>

                    )

                    }




                    {
                        currentstate.isMenuVisible && (

                            <Categories />

                        )

                    }

                </div >

            </div>



        </>
    )

}



export default Home