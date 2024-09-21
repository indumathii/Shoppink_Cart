import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEyeSlash, faEye, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import * as cartUtils from './cartutils';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Context } from './App';


const SignupForm = () => {
    const { contextvalues, setcontextvalues } = useContext(Context);

    const validationSchema2 = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        con_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        firstname: Yup.string()
            .min(3, 'Firstname must be at least 3 characters')
            .required('Firstname is required'),
        lastname: Yup.string()
            .min(3, 'Laststname must be at least 3 characters')
            .required('Lastname is required'),
        address: Yup.string()
            .min(10, 'Address must be at least 10 characters')
            .required('Address is required')
    });

    const initialValues2 = { email: '', password: '', con_password: '', firstname: '', lastname: '', address: '', mobile: 0, }
    const [showpassword, setshowpassword] = useState(true);
    const [cshowpassword, csetshowpassword] = useState(true);
    const [cancel, setcancel] = useState(false);
    const handleTogglePassword = () => (

        setshowpassword(prev => !showpassword)

    )
    const handleTogglecPassword = () => (

        csetshowpassword(prev => !cshowpassword)

    )
    const handlecopy = (event) => {
        event.preventDefault();

    }
    const handlesignupsubmit = (values) => {
        setcontextvalues(prev => ({
            ...prev,
            login: false, signupsubmit: true, currentuser: values
        }))

        cartUtils.signupfunc(values)

    }

    const handlesignupcancel = () => {

        setcontextvalues(prev => ({
            ...prev, showcart: true,
            login: false, signup: false, currentuser: false
        }))


    }


    return (
        <>
            {
                contextvalues.signupsubmit && contextvalues.signup ? (
                    <div className='flex fixed  inset-0 bg-[linear-gradient(45deg,_#4db6ac,_#80cbc4,_#4fc3f7,_#64b5f6,_#9575cd)] mx-auto w-full h-full justify-center '>
                        <div className='flex fixed flex-col mt-[5rem] inset z-100 text-black bg-white md:top-[7rem] w-[20rem] border border-1 border-black md:w-[25rem] md:h-[10rem] text-xl font-bold items-center justify-center items-center rounded rounded-md'>
                            <div className='text-blue-800 p-4 -mt-[1rem]'>Hi {contextvalues.currentuser.firstname}, </div>
                            <p className='text-green-800 p-4 -mt-[1rem]'>Your Registration is Successful!! <br></br>Kindly click here to</p>


                            <div className='flex -mt-[1rem] hover:cursor-pointer underline hover:text-red-700 text-blue-500 hover:scale-110' onClick={() => {
                                setcontextvalues(prev => ({
                                    ...prev,
                                    login: true, signupsubmit: false, signup: false
                                }))
                            }}>Login</div>
                        </div>

                    </div>
                ) : (


                    <div className='flex fixed inset-0 bg-gray-200 w-full h-full justify-center'>
                        <Formik initialValues={initialValues2} validationSchema={validationSchema2} validateOnMount={true} onSubmit={(values) => handlesignupsubmit(values)}>
                            {formik => {
                                return (
                                    <div className='flex flex-col absolute border border-black top-[1rem] md:top-[5rem] w-[20rem] md:w-[50rem] md:h-[30rem] rounded rounded-xl shadow-xl  bg-white'>
                                        <div className='text-3xl text-pink-700 font-bold mt-[0.5rem] md:mt-[1rem] -mt-4'>SIGN UP</div>
                                        <Form className="flex flex-col w-full pl-4 pr-4 md:p-4 justify-between ">
                                            <div className='flex flex-col md:flex-row w-full justify-between '>
                                                <div className='flex flex-col '>
                                                    <div className="flex h-full w-full relative items-center mt-4 ml-0 md:ml-10">
                                                        <FontAwesomeIcon icon={faUser} className='absolute text-xl ml-[0.5rem] text-pink-700' />
                                                        <Field
                                                            type="text"
                                                            id="firstname"
                                                            name="firstname"
                                                            placeholder="Firstname"
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="firstname" component="div" className="text-red-600 text-sm" />
                                                </div>
                                                <div className='flex flex-col '>
                                                    <div className="flex h-full w-full relative items-center mt-4 mr-0 md:mr-10">
                                                        <FontAwesomeIcon icon={faUser} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                        <Field
                                                            type="text"
                                                            id="lastname"
                                                            name="lastname"
                                                            placeholder="Lastname"
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="lastname" component="div" className="text-red-600 text-sm" />
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row w-full justify-between '>
                                                <div className='flex flex-col '>
                                                    <div className="flex h-full w-full relative items-center mt-4 ml-0 md:ml-10">
                                                        <FontAwesomeIcon icon={faHome} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                        <Field
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            placeholder="Address"
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
                                                </div>

                                                <div className='flex flex-col'>
                                                    <div className="flex h-full w-full relative items-center mt-4 mr-0 md:mr-10">
                                                        <FontAwesomeIcon icon={faPhone} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                        <PhoneInput
                                                            country={'us'}
                                                            value={formik.values.mobile}
                                                            onChange={mobile => formik.setFieldValue('mobile', mobile)}
                                                            id="mobile"
                                                            name="mobile"
                                                            type="text"
                                                            buttonStyle={{ border: 'none' }}
                                                            inputStyle={{ border: 'none', height: '10%', width: '100%' }}
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="mobile" component="div" className="text-red-600 text-sm" />
                                                </div>
                                            </div>

                                            <div className='flex flex-col md:flex-row w-full justify-between'>
                                                <div className='flex flex-col'>
                                                    <div className="flex h-full w-full relative items-center mt-4 ml-0 md:ml-10">
                                                        <FontAwesomeIcon icon={faEnvelope} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                        <Field
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            placeholder="Email id"
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500  border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                    </div>
                                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className="flex h-full w-full mt-4 relative items-center mr-0 md:mr-10">
                                                        <FontAwesomeIcon icon={faLock} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                        <Field
                                                            type={showpassword ? 'password' : 'text'}
                                                            id="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            onCopy={handlecopy}
                                                            className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500 border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                        />
                                                        <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} onClick={handleTogglePassword} className='hover:cursor-pointer absolute text-md text-blue-500 ml-[15rem] md:ml-[17rem]' />
                                                    </div>
                                                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className="flex h-full w-full mt-4 relative items-center ml-0 md:ml-10">
                                                    <FontAwesomeIcon icon={faLock} className='absolute text-2xl ml-[0.5rem] text-pink-700' />
                                                    <Field
                                                        type={cshowpassword ? 'password' : 'text'}
                                                        id="con_password"
                                                        name="con_password"
                                                        onCopy={handlecopy}
                                                        placeholder="Confirm Password"
                                                        className="hover:shadow-xl hover:scale-99 hover:border-pink-900 border rounded rounded-md border-pink-500 border-2 pl-[2.5rem] p-2 w-[20rem]"

                                                    />
                                                    <FontAwesomeIcon icon={cshowpassword ? faEyeSlash : faEye} onClick={handleTogglecPassword} className='hover:cursor-pointer absolute text-md text-blue-500  ml-[15rem] md:ml-[17rem]' />
                                                </div>
                                                <ErrorMessage name="con_password" component="div" className="text-red-600 text-sm" />

                                            </div>
                                            <div className='flex h-full w-full justify-center flex-row mt-2 pb-4' >
                                                <button type="submit" className='hover:border-2 flex font-bold justify-center items-center rounded rounded-lg border  mt-3  text-black border-green-900 border-1 bg-green-500 h-10 w-20 hover:bg-green-600 ' disabled={!formik.isValid} >
                                                    SUBMIT
                                                </button>
                                                <button type="button" className='hover:border-2   flex ml-[2rem] font-bold justify-center items-center rounded rounded-lg border mt-3 shadow shadow-md text-black bg-yellow-400 border-yellow-900 border-1  h-10 w-20 hover:bg-yellow-600' onClick={handlesignupcancel}  >
                                                    CANCEL
                                                </button>
                                            </div>

                                        </Form>
                                    </div>
                                )
                            }}
                        </Formik>


                    </div >
                )}
        </>
    )
}

export default SignupForm