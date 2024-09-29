import { add_to_carts, cart_total_value, cartcountcalculation, decrements_quantity, increments_quantity, loginfailure, loginsuccess, setinitialstate } from './actions';
import httpclient from './Axios';



export const carttotalvalue = async (currentstate, dispatch) => {
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    const user_txn = temp_state.usertxn
    console.log("currentstate", currentstate.currentuser.id)
    const response = await httpclient.get(`txns/cart/${currentstate.currentuser.id}`)
    const inCartItems = response.data;
    console.log("inCartItems", inCartItems)
    const addedtocart_items = inCartItems.filter(item => item.cart_status === 'Remove from Cart');
    const totalvalue = addedtocart_items.reduce((total, product) => {
        const tempprice = parseInt(product.price.replace('$', ''));
        return total + (tempprice * product.order_quantity);
    }, 0);

    const cartvalues = {
        ...temp_state,
        totalcartvalue: totalvalue,
        currentcart_txns: inCartItems
    }

    dispatch(cart_total_value(cartvalues))


}

export const handleproductsdesc = (setcontextvalues, p_id, navigate) => {

    setcontextvalues(prev => ({
        ...prev, productsdesc: true, currentpid: p_id
    }))
    navigate(`/productsdesc/${p_id}`);

}



export const emptycart = (setcontextvalues) => {
    alert("Order Placed Successfully")
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
    }))


}



export const orderplaced = (contextvalues, setcontextvalues) => {
    setcontextvalues(prevState => ({
        ...prevState,
        productitems: prevState.productitems.map(item => {
            const new_O_Status = item.p_status === 'Remove from Cart' ? 'Placed' : 'Real';
            console.log("new_O_Status", new_O_Status)
            return {
                ...item,
                order_status: new_O_Status
            };
        })
    }))

}


export const incrementquantity = (currentstate, p_id, dispatch) => {
    console.log("increment")
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    const user_txn = temp_state.usertxn
    const selected_txn_index = user_txn.findIndex(txn => txn.product_id === p_id);
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
        //cartcountcalc(currentstate, dispatch)
        window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in increment quantity", saved_state);
        cartcountcalc(currentstate, dispatch)
    }


}

export const decrementquantity = (currentstate, p_id, dispatch) => {
    console.log("decrement")
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    const user_txn = temp_state.usertxn
    const selected_txn_index = user_txn.findIndex(txn => txn.product_id === p_id);
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

        console.log("updated txn after decrement", updated_txn_2)

        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn_2 : txn;

        });

        const updated_state = {
            ...temp_state,
            usertxn: updated_user_txn
        };
        dispatch(decrements_quantity(updated_state))
        //cartcountcalc(currentstate, dispatch)
        window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
        console.log("context values from localstorage updated in decrement quantity", saved_state);
        cartcountcalc(currentstate, dispatch)


    }
}


export const cartcountcalc = (currentstate, dispatch) => {
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))

    const current_cart_items = temp_state.usertxn.filter(txn => txn.cart_status === 'Remove from Cart');
    console.log("printing cartcountcalc", current_cart_items.length)
    const cartvalues = {
        ...temp_state,
        cartcount: current_cart_items.length

    };
    dispatch(cartcountcalculation(cartvalues))
    console.log("updated cart count values", cartvalues)
    window.localStorage.setItem('shoppink-store', JSON.stringify(cartvalues))

}


export const addtocart = async (currentstate, p_id, dispatch) => {
    console.log("addtocart clicked")
    const tmp_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
    const temp_usertxn = tmp_state.usertxn
    console.log("temp_usertxn", temp_usertxn)
    if (tmp_state.isloggedin) {
        console.log("user logged in")
        //const selected_txn = temp_usertxn.filter(txns => (txns.user_id === tmp_state.currentuser.id) && (txns.product_id === p_id))// && (txns.cart_status === 'Remove from Cart'));
        const selected_txn_index = temp_usertxn.findIndex(txns => (txns.user_id === tmp_state.currentuser.id) && (txns.product_id === p_id));
        console.log("selected index", selected_txn_index)
        console.log("selected index item", temp_usertxn[selected_txn_index])
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
            const new_State = {
                ...tmp_state,
                usertxn: new_added_txns,
                cartcount: tmp_state.cartcount + 1
            }
            console.log("printing new State", new_State)


            dispatch(add_to_carts(new_State));
            window.localStorage.setItem('shoppink-store', JSON.stringify(new_State))
            const usr_tns = await httpclient.post('txns', txn_items);
            return usr_tns.data;

            //

            const saved_state = JSON.parse(window.localStorage.getItem('shoppink-store'))
            console.log("context values from localstorage updated afted addtocart", saved_state);
            cartcountcalc(currentstate, dispatch)
            //cartcountcalc(contextvalues, setcontextvalues)
        }
        else if (temp_usertxn[selected_txn_index].cart_status === 'Add to Cart') {
            console.log("inside else if loop of selected_txn")

            console.log("item in add to cart status", temp_usertxn[selected_txn_index])
            if (selected_txn_index !== -1) {
                const updated_txn = {
                    ...temp_usertxn[selected_txn_index], // Keep the existing properties
                    order_quantity: 1,
                    cart_status: 'Remove from Cart'
                };

                console.log("updated txn adding to cart in else if loop", updated_txn)

                const updated_user_txn = temp_usertxn.map((txn, index) => {
                    return index === selected_txn_index ? updated_txn : txn;
                });

                const updated_state = {
                    ...tmp_state,
                    usertxn: updated_user_txn
                };
                dispatch(add_to_carts(updated_state));
                //cartcountcalc(currentstate, dispatch)

                //cartcountcalc(setcontextvalues)
                window.localStorage.setItem('shoppink-store', JSON.stringify(updated_state));
                cartcountcalc(currentstate, dispatch)


            }
        }
        else {
            console.log("printing add to cart else loop")

        }
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
            console.log("printing saved from localstorage in cartutils", savedstate)
            dispatch(loginsuccess(updatedloginvalues));

        } else {
            console.log("Invalid Password");

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