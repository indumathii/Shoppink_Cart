import { useSelector } from 'react-redux';
import { add_to_carts, cart_total_value, cartcountcalculation, decrements_quantity, place_order, increments_quantity, loginfailure, loginsuccess, setinitialstate } from './actions';
import httpclient from './Axios';
import emailjs from 'emailjs-com';
import { useState } from 'react';



export const sendemail = async (formdata, setformdata, currentstate) => {
    console.log("inside mail cart items", currentstate.currentcart_txns)
    const productList = currentstate.currentcart_txns.map((item, index) => `${index + 1}. ${item.product_name}`).join('\n');
    const length = currentstate.currentcart_txns.length


    alert("sending email")
    setformdata(prev => ({
        ...prev,
        to_name: currentstate.currentuser.firstname,
        mail: 'neelaindumathi@gmail.com',
        to_mail: 'neelaindumathi@gmail.com',
        products: productList,
        product_length: length

    }));
    emailjs.send('service_123', 'template_1', formdata, 'c3bXIk5PCNWxt4F1o')
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text, formdata.to_mail, formdata.message);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
        });
}




export const carttotalvalue = async (currentstate, dispatch) => {
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    //const user_txn = temp_state.usertxn
    console.log("currentstate", currentstate.currentuser.id)
    const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id} `)
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
            placeorder: false

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



/*export const emptycart = (setcontextvalues) => {
    setcontextvalues(prevState => ({
        ...prevState,
        productitems: prevState.productitems.map(item => {
            const new_P_Status = 'Add to Cart';

            console.log("inside empty cart function in cartutils")


            return {
                ...item,
                p_status: new_P_Status,


            };
        })
    }))*/






export const orderplaced = async (currentstate, dispatch) => {
    //alert('Order Placed Successfully')
    const temp_state = currentstate //JSON.parse(window.localStorage.getItem('shoppink-store'))
    const current_cart_items = temp_state.currentcart_txns.filter(txn => txn.cart_status === 'Remove from Cart');
    console.log("orders placed", current_cart_items)
    let updatedUsTxns = []
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




export const incrementquantity = async (currentstate, p_id, dispatch) => {
    console.log("increment")
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    //const user_txn = temp_state.usertxn
    const res = await httpclient.get('txns');
    const user_txn = res.data;
    console.log("currentstate user id", currentstate.currentuser.id)
    console.log("product id", p_id)
    const selected_txn_index = user_txn.findIndex(txn => (txn.user_id === currentstate.currentuser.id) && (txn.product_id === p_id));
    console.log("selected index", selected_txn_index)
    console.log("before increment", user_txn[selected_txn_index])
    if (user_txn[selected_txn_index].order_quantity >= 5) {
        alert("Sorry, you have reached the maximum limit!");
    }
    else {
        const updated_txn = {
            ...user_txn[selected_txn_index],
            order_quantity: user_txn[selected_txn_index].order_quantity + 1

        };
        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn : txn;

        });

        const updated_state = {
            ...temp_state,
            usertxn: updated_user_txn
        };

        dispatch(increments_quantity(updated_state))
        console.log("printing increment quantity states aftr dispatch", updated_state)
        //cartcountcalc(currentstate, dispatch)
        window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in increment quantity", saved_state);
        const usr_tns = await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn);
        cartcountcalc(updated_state, dispatch)
        console.log("printing increment quantity after carcountcal dispatch", currentstate)
        carttotalvalue(updated_state, dispatch)
        console.log("printing increment quantity after cartotalvalue dispatch", currentstate)
        return usr_tns.data;
    }


}

export const decrementquantity = async (currentstate, p_id, dispatch) => {
    console.log("decrement")
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    //const user_txn = temp_state.usertxn
    const res = await httpclient.get('txns');
    const user_txn = res.data;
    const selected_txn_index = user_txn.findIndex(txn => txn.product_id === p_id && (txn.user_id === currentstate.currentuser.id));
    const selected_txn_index_2 = currentstate.category_temp_products.findIndex(txn => txn.product_id === p_id);
    console.log("before decrement", user_txn[selected_txn_index])

    if (selected_txn_index !== -1) {
        const updated_txn_1 = {
            ...user_txn[selected_txn_index], // Keep the existing properties
            order_quantity: user_txn[selected_txn_index].order_quantity > 0 ? user_txn[selected_txn_index].order_quantity - 1 : 0,

        };
        const updated_txn_2 = {
            ...user_txn[selected_txn_index], // Keep the existing properties
            cart_status: updated_txn_1.order_quantity > 0 ? 'Remove from Cart' : 'Add to Cart',
            order_quantity: updated_txn_1.order_quantity

        };

        const category_txn = {
            ...currentstate.category_temp_products[selected_txn_index_2], // Keep the existing properties
            iscategorytocart: updated_txn_1.order_quantity > 0 ? false : true,
            order_quantity: updated_txn_1.order_quantity,
            cart_status: updated_txn_1.order_quantity > 0 ? 'Remove from Cart' : 'Add to Cart',

        };


        console.log("updated txn after decrement", updated_txn_2)

        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn_2 : txn;

        });

        const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
            return index === selected_txn_index_2 ? category_txn : txn;

        });

        const updated_state = {
            ...temp_state,
            usertxn: updated_user_txn,
            isaddtocart: updated_txn_1.order_quantity > 0 ? false : true,
            category_temp_products: updated_category_txn

        };
        dispatch(decrements_quantity(updated_state))

        window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in decrement quantity", saved_state);
        console.log("Current user in currenstate decrement", typeof (BigInt(currentstate.currentuser.id)))
        const usr_tns = await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn_2);
        cartcountcalc(updated_state, dispatch)
        carttotalvalue(updated_state, dispatch)
        return usr_tns.data;



        //cartcountcalc(currentstate, dispatch)


    }
}




export const addtocart = async (currentstate, p_id, dispatch) => {
    console.log("addtocart clicked")
    const tmp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    //const temp_usertxn = tmp_state.usertxn
    const res = await httpclient.get('txns');
    const temp_usertxn = res.data;
    console.log("temp_usertxn", temp_usertxn)
    if (tmp_state.isloggedin) {
        console.log("user logged in")

        const selected_txn_index = temp_usertxn.findIndex(txns => (txns.user_id === tmp_state.currentuser.id) && (txns.product_id === p_id));
        const selected_txn_index_2 = currentstate.category_temp_products.findIndex(txn => txn.product_id === p_id);
        console.log("selected index item 2", selected_txn_index_2)
        console.log("selected index item 2", currentstate.category_temp_products[selected_txn_index_2])
        if (selected_txn_index === -1) {
            console.log("inside if loop of selected_txn", temp_usertxn[selected_txn_index])
            const maxId = temp_usertxn.length > 0 ? Math.max(...temp_usertxn.map(obj => obj.txn_id)) : 0;
            const txn_items = {
                txn_id: maxId + 1,
                user_id: tmp_state.currentuser.id,
                product_id: p_id,
                order_quantity: 1,
                cart_status: 'Remove from Cart',
                order_status: 'New'
            }
            console.log("new added item", txn_items)
            const new_added_txns = [...tmp_state.usertxn, txn_items]

            const category_txn = {
                ...currentstate.category_temp_products[selected_txn_index_2],
                iscategorytocart: false,
                order_quantity: 1,
                cart_status: 'Remove from Cart',
                order_status: 'New',
                txn_id: maxId + 1,
                user_id: tmp_state.currentuser.id,

            };
            const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                return index === selected_txn_index_2 ? category_txn : txn;

            });
            const new_State = {
                ...tmp_state,
                usertxn: new_added_txns,
                cartcount: tmp_state.cartcount + 1,
                isaddtocart: false,
                category_temp_products: updated_category_txn

            }
            console.log("printing new State", new_State)


            dispatch(add_to_carts(new_State));

            window.localStorage.setItem('shoppink-store', JSON.stringify(new_State))
            const usr_tns = await httpclient.post('txns', txn_items);
            const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
            console.log("context values from localstorage updated afted addtocart", saved_state);
            cartcountcalc(new_State, dispatch)
            carttotalvalue(new_State, dispatch)
            return usr_tns.data;

            //

            //cartcountcalc(contextvalues, setcontextvalues)
        }
        else if (temp_usertxn[selected_txn_index].cart_status === 'Add to Cart') {
            console.log("inside else if loop of selected_txn_2")
            if (temp_usertxn[selected_txn_index].order_status === 'Placed' || currentstate.category_temp_products[selected_txn_index_2].order_status === 'Placed') {
                alert("You have already ordered this item, Please select any other item")
            }
            else {
                console.log("item in add to cart status", currentstate.category_temp_products[selected_txn_index_2])
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
                    const category_txn = {
                        ...currentstate.category_temp_products[selected_txn_index_2],
                        iscategorytocart: false,
                        cart_status: 'Remove from Cart',
                        order_quantity: 1,
                        order_status: 'New'

                    };
                    console.log("updated false category_txn in else add to cart", category_txn)
                    const updated_category_txn = currentstate.category_temp_products.map((txn, index) => {
                        return index === selected_txn_index_2 ? category_txn : txn;

                    });

                    const updated_state = {
                        ...tmp_state,
                        usertxn: updated_user_txn,
                        isaddtocart: false,
                        category_temp_products: updated_category_txn

                    };
                    dispatch(add_to_carts(updated_state));

                    //cartcountcalc(currentstate, dispatch)

                    //cartcountcalc(setcontextvalues)
                    window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
                    const usr_tns = await httpclient.put(`txns/${BigInt(currentstate.currentuser.id)}/${p_id}`, updated_txn);
                    cartcountcalc(updated_state, dispatch)
                    carttotalvalue(updated_state, dispatch)
                    return usr_tns.data;



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