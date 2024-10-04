import { useSelector } from 'react-redux';
import { add_to_carts, cart_total_value, cartcountcalculation, decrements_quantity, place_order, increments_quantity, loginfailure, loginsuccess, setinitialstate } from './actions';
import httpclient from './Axios';
import emailjs from 'emailjs-com';
import { useState } from 'react';



export const sendemail = async (currentstate, dispatch) => {
    console.log("inside mail cart items", currentstate.currentcart_txns)
    const productList = currentstate.currentcart_txns.map((item, index) => `${index + 1}. ${item.product_name}`).join('\n');
    const length = currentstate.currentcart_txns.length
    alert("sending email")
    const new_data = {
        to_name: currentstate.currentuser.firstname,
        mail: 'induakshay2209@gmail.com',
        to_mail: 'neelaindumathi@gmail.com',
        products: productList,
        product_length: length
    }
    const updated_data = {
        ...currentstate,
        formdata: new_data
    }
    dispatch(setinitialstate(updated_data))
    console.log("form data ", updated_data)
    emailjs.send('service_123', 'template_1', new_data, 'N4jTOjs3Io0WCOvio')
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text, formdata.to_mail, formdata.message);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
        });
}




export const carttotalvalue = async (currentstate, dispatch) => {
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    console.log("currentstate", currentstate.currentuser.id)
    const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id}`)
    const inCartItems = response.data;
    const addedtocart_items = inCartItems.filter(item => item.cart_status === 'Remove from Cart');
    console.log("products in cart", addedtocart_items)
    const totalvalue = addedtocart_items.reduce((total, product) => {
        const tempprice = parseInt(product.price.replace(/[$,]/g, ''));
        return total + (tempprice * product.order_quantity);
    }, 0);

    const cartvalues = {
        ...currentstate,
        totalcartvalue: totalvalue,
        currentcart_txns: inCartItems,
    }

    dispatch(cart_total_value(cartvalues))
    console.log("printing inside cartotalvalue after dispatch ", cartvalues)


}


export const cartcountcalc = async (currentstate, dispatch) => {
    if (currentstate.isloggedin) {
        const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        const res = await httpclient.get('txns');
        const usertxn = res.data;
        console.log("printing current state in cartcount utils", currentstate)
        const current_cart_items = usertxn.filter(txn => (txn.cart_status === 'Remove from Cart') && (txn.user_id === currentstate.currentuser.id));
        console.log("printing current cart items", current_cart_items)
        console.log("printing cartcountcalc", current_cart_items.length)
        const cartvalues = {
            ...currentstate,
            cartcount: current_cart_items.length,

        };
        dispatch(cartcountcalculation(cartvalues))
        console.log("updated cart count values", cartvalues)
        window.localStorage.setItem('shoppink-store', JSON.stringify(cartvalues))
    }
}

export const handleproductsdesc = (currentstate, dispatch, p_id, navigate) => {

    const cartvalues = {
        ...currentstate,
        productsdesc: true,
        currentpid: p_id

    };
    dispatch(cartcountcalculation(cartvalues))
    navigate(`/ productsdesc / ${p_id} `);

}


export const orderplaced = async (currentstate, dispatch) => {
    const temp_state = currentstate //JSON.parse(window.localStorage.getItem('shoppink-store'))
    const current_cart_items = temp_state.currentcart_txns.filter(txn => txn.cart_status === 'Remove from Cart');
    console.log("orders placed", current_cart_items)
    for (const product of current_cart_items) {
        console.log("printing temp_state", temp_state)
        console.log("printing user txn", temp_state.usertxn)
        console.log("printing current cart txn", current_cart_items)
        console.log("printing user id", currentstate.currentuser.id)
        const selected_txn_index = temp_state.usertxn.findIndex(txn => (txn.user_id === currentstate.currentuser.id) && (txn.product_id === product.product_id));
        const updated_value = {
            ...temp_state.usertxn[selected_txn_index],
            order_status: 'Placed',
            cart_status: 'Add to Cart'

        }
        console.log("printin updated value in order placed", updated_value)
        await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${product.product_id}`, updated_value);


    }
    const res = await httpclient.get('txns');
    const usr_txns = res.data;
    const currentuser_txn = usr_txns.filter(txn => txn.user_id === currentstate.currentuser.id);
    const updated_state = {
        ...temp_state,
        usertxn: currentuser_txn,
        showcart: false,
        placeorder: true,
        currentcart_txns: current_cart_items
    };
    cartcountcalc(updated_state, dispatch)
    console.log("updated user transaction in order placed", updated_state)
    dispatch(place_order(updated_state))
    window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));

}




export const incrementquantity = async (currentstate, module, key, p_id, dispatch) => {
    console.log("increment")
    //const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    console.log("module", module)
    console.log("key", key)
    console.log("p_id", p_id)
    let updatedstate = {}
    const res = await httpclient.get('txns');
    const user_txn = res.data;
    console.log("currentstate user id", currentstate.currentuser.id)
    console.log("product id", p_id)
    const selected_txn_index = user_txn.findIndex(txn => (txn.user_id === currentstate.currentuser.id) && (txn.product_id === p_id));
    const selected_txn_index_2 = module.findIndex(txn => (txn.user_id === currentstate.currentuser.id) && (txn.product_id === p_id));
    console.log("selected index", selected_txn_index)
    console.log("selected index user txn", user_txn[selected_txn_index])
    console.log("Selected index 2", selected_txn_index_2)
    console.log("module selected index of 2", module[selected_txn_index_2])

    if (user_txn[selected_txn_index].order_quantity >= 5 || module[selected_txn_index_2].order_quantity >= 5) {
        alert("Sorry, you have reached the maximum limit!");
    }
    else {
        console.log("inside else of increment")
        const updated_txn = {
            ...user_txn[selected_txn_index],
            order_quantity: user_txn[selected_txn_index].order_quantity + 1

        };
        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn : txn;

        });
        if (key === 'product_desc') {
            console.log("inside if of product desc module of increment")
            const temp_product_1 = {
                ...currentstate.temp_products[0],
                cart_status: 'Remove from Cart',
                isaddtocart: false,
                order_quantity: currentstate.temp_products[0].order_quantity + 1,
            }

            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: false,
                temp_products: temp_product_1
            };
            dispatch(increments_quantity(updatedstate))

        }
        else if (key === 'cart') {
            console.log("inside else if of cart module of increment")
            const category_txn = {
                ...module[selected_txn_index_2],
                iscategorytocart: false,
                order_quantity: currentstate.category_temp_products[selected_txn_index_2].order_quantity + 1,
                cart_status: 'Remove from Cart',
                order_status: 'New',
            };

            const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                return index === selected_txn_index_2 ? category_txn : txn;

            });

            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: false,
                category_temp_products: updated_category_txn,
            };
            dispatch(increments_quantity(updatedstate));

        }
        else {
            console.log("inside user txn module of increment")

            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: false,
            };
            dispatch(increments_quantity(updatedstate))
            console.log("printing increment quantity states aftr dispatch", updatedstate)
        }


        //cartcountcalc(currentstate, dispatch)
        window.localStorage.setItem('shoppink-store', JSON.stringify(updatedstate));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in increment quantity", saved_state);
        const usr_tns = await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn);
        cartcountcalc(updatedstate, dispatch)
        console.log("printing increment quantity after carcountcal dispatch", currentstate)
        carttotalvalue(updatedstate, dispatch)
        console.log("printing increment quantity after cartotalvalue dispatch", currentstate)
        return usr_tns.data;
    }


}

export const decrementquantity = async (currentstate, module, key, p_id, dispatch) => {
    console.log("decrement")
    const res = await httpclient.get('txns');
    const user_txn = res.data;
    let updatedstate = {}
    const selected_txn_index = user_txn.findIndex(txn => txn.product_id === p_id && (txn.user_id === currentstate.currentuser.id));
    const selected_txn_index_2 = module.findIndex(txn => txn.product_id === p_id);
    console.log("selected index", selected_txn_index)
    console.log("selected index user txn", user_txn[selected_txn_index])
    console.log("Selected index 2", selected_txn_index_2)
    console.log("module selected index of 2", module[selected_txn_index_2])

    if (selected_txn_index !== -1) {
        const updated_txn_1 = {
            ...user_txn[selected_txn_index],
            order_quantity: user_txn[selected_txn_index].order_quantity > 0 ? user_txn[selected_txn_index].order_quantity - 1 : 0,

        };
        const updated_txn_2 = {
            ...user_txn[selected_txn_index],
            cart_status: updated_txn_1.order_quantity > 0 ? 'Remove from Cart' : 'Add to Cart',
            order_quantity: updated_txn_1.order_quantity

        };
        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn_2 : txn;

        });
        if (key === 'product_desc') {
            console.log("inside if product desc module decrement")

            const temp_product_1 = {
                ...currentstate.temp_products[0],
                cart_status: updated_txn_1.order_quantity > 0 ? 'Remove from Cart' : 'Add to Cart',
                isaddtocart: updated_txn_1.order_quantity > 0 ? false : true,
                order_quantity: updated_txn_1.order_quantity,
                order_status: 'New'
            }
            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: updated_txn_1.order_quantity > 0 ? false : true,
                temp_products: temp_product_1,
                cartcount: currentstate.cartcount > 0 ? currentstate.cartcount - 1 : 0

            };
            dispatch(decrements_quantity(updatedstate))

        }
        else if (key === 'cart') {
            console.log("inside else if cart module decrement")


            const category_txn = {
                ...module[selected_txn_index_2], // Keep the existing properties
                iscategorytocart: updated_txn_1.order_quantity > 0 ? false : true,
                order_quantity: updated_txn_1.order_quantity,
                cart_status: updated_txn_1.order_quantity > 0 ? 'Remove from Cart' : 'Add to Cart',

            };

            const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                return index === selected_txn_index_2 ? category_txn : txn;

            });
            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: updated_txn_1.order_quantity > 0 ? false : true,
                category_temp_products: updated_category_txn,
            };
            dispatch(decrements_quantity(updatedstate))

        }
        else {
            console.log("inside else of general usr txn decrement")
            updatedstate = {
                ...currentstate,
                usertxn: updated_user_txn,
                isaddtocart: updated_txn_1.order_quantity > 0 ? false : true,
            };
            dispatch(decrements_quantity(updatedstate))
        }

        window.localStorage.setItem('shoppink-store', JSON.stringify(updatedstate));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in decrement quantity", saved_state);
        console.log("Current user in currenstate decrement", typeof (BigInt(currentstate.currentuser.id)))
        const usr_tns = await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn_2);
        cartcountcalc(updatedstate, dispatch)
        carttotalvalue(updatedstate, dispatch)
        return usr_tns.data;

    }
}




export const addtocart = async (currentstate, module, key, p_id, dispatch) => {
    console.log("addtocart clicked")
    console.log("Key", key)
    console.log("currentstate", currentstate)
    console.log("p_id", p_id)
    console.log("dispatch", dispatch)
    console.log("module", module)
    let updatedstate = {}
    const res = await httpclient.get('txns');
    const temp_usertxn = res.data;
    console.log("temp_usertxn", temp_usertxn)
    if (currentstate.isloggedin) {
        console.log("user logged in")
        const selected_txn_index = temp_usertxn.findIndex(txns => (txns.user_id === currentstate.currentuser.id) && (txns.product_id === p_id));
        const selected_txn_index_2 = module.findIndex(txn => txn.product_id === p_id);
        console.log("selected index item ", selected_txn_index)
        console.log("selected index item ", temp_usertxn[selected_txn_index])
        console.log("selected index item 2", selected_txn_index_2)
        console.log("selected index item 2", module[selected_txn_index_2])
        if (selected_txn_index === -1) {
            console.log("inside if loop of selected_txn", temp_usertxn[selected_txn_index])
            const maxId = temp_usertxn.length > 0 ? Math.max(...temp_usertxn.map(obj => obj.txn_id)) : 0;
            const txn_items = {
                txn_id: maxId + 1,
                user_id: currentstate.currentuser.id,
                product_id: p_id,
                order_quantity: 1,
                cart_status: 'Remove from Cart',
                order_status: 'New'
            }
            console.log("new added item", txn_items)
            const new_added_txns = [...currentstate.usertxn, txn_items]
            if (key === 'product_desc') {
                console.log("inside if if if product desc module")
                const temp_product_1 = {
                    ...currentstate.temp_products[0],
                    cart_status: 'Remove from Cart',
                    isaddtocart: false,
                    order_quantity: 1,
                    order_status: 'New'
                }

                updatedstate = {
                    ...currentstate,
                    usertxn: new_added_txns,
                    cartcount: currentstate.cartcount + 1,
                    isaddtocart: false,
                    temp_products: temp_product_1
                };
                dispatch(add_to_carts(updatedstate));
            }
            else if (key === 'cart') {
                console.log("inside  if if cart module")
                console.log("Current category txn", currentstate.category_temp_products)
                const category_txn = {
                    ...module[selected_txn_index_2],
                    iscategorytocart: false,
                    order_quantity: 1,
                    cart_status: 'Remove from Cart',
                    order_status: 'New',
                    txn_id: txn_items.txn_id,
                    user_id: currentstate.currentuser.id,

                };

                const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                    return index === selected_txn_index_2 ? category_txn : txn;

                });

                updatedstate = {
                    ...currentstate,
                    usertxn: new_added_txns,
                    cartcount: currentstate.cartcount + 1,
                    isaddtocart: false,
                    category_temp_products: updated_category_txn,
                };

                console.log("updated state after addedtocart inside cart category", updatedstate)
                dispatch(add_to_carts(updatedstate));

            }
            else {
                console.log("inside else of 1st if add to cart module")
                updatedstate = {
                    ...currentstate,
                    usertxn: new_added_txns,
                    cartcount: currentstate.cartcount + 1,
                    isaddtocart: false,

                };
                dispatch(add_to_carts(updatedstate));

            } window.localStorage.setItem('shoppink-store', JSON.stringify(updatedstate))
            const usr_tns = await httpclient.post('txns', txn_items);
            const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
            console.log("context values from localstorage updated afted addtocart", saved_state);
            cartcountcalc(updatedstate, dispatch)
            carttotalvalue(updatedstate, dispatch)
            return usr_tns.data;

        }
        else if (temp_usertxn[selected_txn_index].cart_status === 'Add to Cart') {
            console.log("inside else if loop of selected_txn", selected_txn_index)
            console.log("inside else if loop of selected_txn", temp_usertxn[selected_txn_index])
            if (temp_usertxn[selected_txn_index].order_status === 'Placed' || module[selected_txn_index_2].order_status === 'Placed') {
                alert("You have recently ordered this item, Please select any other item")
            }
            else {
                console.log("item in add to cart status", module[selected_txn_index_2])
                if (selected_txn_index !== -1 || selected_txn_index_2 !== -1) {
                    const updated_txn = {
                        ...temp_usertxn[selected_txn_index], // Keep the existing properties
                        order_quantity: 1,
                        cart_status: 'Remove from Cart',
                        order_status: 'New'
                    };

                    console.log("updated txn adding to cart in else if loop", updated_txn)

                    const updated_user_txn = temp_usertxn.map((txn, index) => {
                        return index === selected_txn_index ? updated_txn : txn;
                    });
                    if (key === 'product_desc') {
                        console.log("inside product_desc if module")
                        const temp_product_1 = {
                            ...module[selected_txn_index_2],
                            cart_status: 'Remove from Cart',
                            isaddtocart: false,
                            order_quantity: 1,
                            order_status: 'New'
                        }
                        updatedstate = {
                            ...currentstate,
                            usertxn: updated_user_txn,
                            isaddtocart: false,
                            temp_products: temp_product_1

                        };
                        dispatch(add_to_carts(updatedstate));
                    }
                    else if (key === 'cart') {
                        console.log("inside cart else if module")
                        const category_txn = {
                            ...module[selected_txn_index_2],
                            iscategorytocart: false,
                            cart_status: 'Remove from Cart',
                            order_quantity: 1,
                            order_status: 'New'

                        };

                        console.log("updated false category_txn in else add to cart", category_txn)
                        const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                            return index === selected_txn_index_2 ? category_txn : txn;

                        });

                        updatedstate = {
                            ...currentstate,
                            usertxn: updated_user_txn,
                            isaddtocart: false,
                            category_temp_products: updated_category_txn,


                        };
                        dispatch(add_to_carts(updatedstate));

                    }
                    else {

                        console.log("inside addtocart no mdoule else loop")
                        updatedstate = {
                            ...currentstate,
                            usertxn: updated_user_txn,

                        };

                        dispatch(add_to_carts(updatedstate));
                    }

                    window.localStorage.setItem('shoppink-store', JSON.stringify(updatedstate));
                    await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn);
                    cartcountcalc(updatedstate, dispatch)
                    carttotalvalue(updatedstate, dispatch)



                }
            }
        }
        else if (temp_usertxn[selected_txn_index].cart_status === 'Remove from Cart') {
            console.log("inside else if if loop of selected_txn")
            if (temp_usertxn[selected_txn_index].order_status === 'New') {
                alert("You have already ordered this item, Please select any other item")
            }
        }
        else {
            console.log("printing add to cart else loop")

        }
        cartcountcalc(currentstate, dispatch)
        carttotalvalue(currentstate, dispatch)
    }

    else {
        alert("Please Login to add items to cart")
    }

}


/* Backend Data retrieval Functions */

export const loginfunc = async (values, currentstate, dispatch) => {

    try {
        console.log("insideloginfunc")
        const response = await httpclient.get('signup');
        const users = response.data;
        console.log("users", users);


        const userFound = users.find(user => user.email === values.email);
        console.log("userfound", userFound)

        if (!userFound) {
            console.log("User not Found");
            const updatedfailurevalues = {
                ...currentstate,
                login: true,
                logsubmit: false
            };
            console.log("updated failure values")
            alert("User not registered")
            dispatch(loginfailure(updatedfailurevalues));
        }
        else if (userFound.password === values.password) {
            console.log("Password matched");
            const res = await httpclient.get('txns');
            const usr_txns = res.data;
            console.log("usr_txn", usr_txns);
            const currentuser_txn = usr_txns.filter(txn => txn.user_id === userFound.id);


            const updatedloginvalues = {
                ...currentstate,
                users: users,
                currentuser: userFound,
                isloggedin: true,
                currentTime: new Date().toLocaleTimeString(),
                usertxn: currentuser_txn,
                login: false,
                logsubmit: true
            };

            console.log("Setting updated login value")
            window.localStorage.setItem('shoppink-store', JSON.stringify(updatedloginvalues))
            const savedstate = JSON.parse(window.localStorage.getItem('shoppink-store'))
            console.log("printing saved from localstorage in cartutils", updatedloginvalues)
            dispatch(loginsuccess(updatedloginvalues));
            cartcountcalc(updatedloginvalues, dispatch)
            carttotalvalue(updatedloginvalues, dispatch)

        } else {
            console.log("Invalid Password");
            alert("Invalid Password")

        }


    } catch (error) {
        console.error("Error fetching users:", error);
    }


}

export const signupfunc = async (values) => {
    try {
        console.log("User signed up successfully:", values);
        const response = await httpclient.post('signup', values);
        return response.data;
    } catch (error) {
        console.error("Error signing up user:", error);
        throw error;
    }

}