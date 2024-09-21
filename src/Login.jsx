import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import * as cartUtils from './cartutils';
import { Context } from './App';


const Login = () => {

    const { contextvalues, setcontextvalues } = useContext(Context);
    useEffect(() => {
        window.localStorage.setItem("shoppink-states", JSON.stringify(contextvalues));
        console.log("inside app.jsx contextvalues", contextvalues)
    }, [contextvalues]);


    const [login_userdetails, setlogin_userdetails] = useState([{ username: '', password: '' }]);
    const validationSchema1 = Yup.object({

        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });


    const initialValues1 = { email: '', password: '' }

    const [showpassword, setshowpassword] = useState(true);
    const [cshowpassword, csetshowpassword] = useState(true);
    const handleTogglePassword = () => (

        setshowpassword(prev => !showpassword)

    )

    const handlecopy = (event) => {
        event.preventDefault();

    }
    const handlesubmit = async (values, users, currentuser, setcurrentuser, setusers) => {
        console.log("handlesubmit clicked", values)
        setcontextvalues(prev => ({ ...prev, login: false, signup: false }))
        setlogin_userdetails(prev => ({
            ...prev,
            email: values.email,
            password: values.password
        }))


        const usercheck = await cartUtils.loginfunc(values, contextvalues, setcontextvalues)
        if (usercheck === 1 || usercheck === 0) {
            console.log("usercheck if", usercheck)
            setcontextvalues(prev => ({ ...prev, login: true, logsubmit: false }))

        }
        else {
            console.log("usercheck else", usercheck)
            setcontextvalues(prev => ({ ...prev, login: false, logsubmit: true }))
        }

        console.log("inside login handlesubmit", contextvalues.currentuser.firstname)
    }
    const handlesignup = () => {

        setcontextvalues(prev => ({ ...prev, login: false, signup: true, currentuser: null }))
    }
    const handlecancel = () => {

        setcontextvalues(prev => ({ ...prev, login: false, signup: false, currentuser: null }))

    }


    return (
        <>

            <div className='flex fixed inset-0 bg-gray-200 mx-auto w-full h-full justify-center'>


                <Formik initialValues={initialValues1} validationSchema={validationSchema1} validateOnMount={true} onSubmit={(values) => handlesubmit(values, contextvalues, setcontextvalues)}>
                    {formik => {

                        return (
                            <div className='flex flex-col absolute border border-black top-[5rem] w-[28rem] h-[28rem] rounded rounded-xl shadow-xl  bg-white justify-center items-center'>
                                <div className='text-3xl text-indigo-800 font-bold mt-[1rem] -mt-4'>LOGIN</div>
                                <Form className="flex flex-col max-w-md p-4">
                                    <div className='flex flex-col'>
                                        <div className="flex h-full w-full relative items-center mt-4">
                                            <FontAwesomeIcon icon={faEnvelope} className='absolute text-2xl ml-[0.5rem] text-blue-700' />
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="Email id"
                                                className="hover:shadow-xl hover:scale-99 hover:border-blue-900 border rounded rounded-md border-blue-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                            />
                                        </div>
                                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className="flex h-full w-full mt-4 relative items-center">
                                            <FontAwesomeIcon icon={faLock} className='absolute text-2xl ml-[0.5rem] text-blue-700' />
                                            <Field
                                                type={showpassword ? 'password' : 'text'}
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                onCopy={handlecopy}
                                                className="hover:shadow-xl hover:scale-99 hover:border-blue-900 border rounded rounded-md border-blue-500 border-2 pl-[2.5rem] p-2 w-[20rem]"

                                            />
                                            <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} onClick={handleTogglePassword} className='hover:cursor-pointer absolute text-md text-pink-700 ml-[17rem]' />
                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                                    </div>

                                    <div className='flex h-full w-full flex-row justify-center mt-4'>
                                        <button type="submit" className='hover:border-2 flex font-bold justify-center items-center rounded rounded-lg border shadow shadow-md text-black border-green-900 border-1 bg-green-500 h-10 w-20 hover:bg-green-600' disabled={!formik.isValid} >
                                            SUBMIT
                                        </button>
                                        <button type="button" className='hover:border-2 flex ml-[2rem] font-bold justify-center items-center rounded rounded-lg border shadow shadow-md text-black bg-yellow-400 border-yellow-900 border-1  h-10 w-20 hover:bg-yellow-600' onClick={handlecancel}   >
                                            CANCEL
                                        </button>
                                    </div>
                                    <div className='flex mt-3 justify-center'>
                                        <span>Don't have an account? &nbsp; </span> <span className='transition-transform duration-300 hover:scale-110 flex text-blue-500 font-bold underline hover:text-blue-900 hover:cursor-pointer' onClick={handlesignup}> Sign Up</span>
                                    </div>
                                </Form>
                            </div>
                        )
                    }}
                </Formik>




            </div >

        </>
    )
}

export default Login