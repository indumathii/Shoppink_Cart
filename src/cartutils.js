import httpclient from './Axios';


export const handleproductsdesc = (setcontextvalues, p_id, navigate) => {

    setcontextvalues(prev => ({
        ...prev, productsdesc: true, currentpid: p_id
    }))
    navigate(`/productsdesc/${p_id}`);

}


export const addtocart = (setcontextvalues, p_id) => {
    console.log("addtocart clicked")
    const tmp_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
    const temp_usertxn = tmp_state.usertxn
    const prd_items = tmp_state.productitems
    console.log("temp_usertxn", temp_usertxn)
    if (tmp_state.isloggedin) {
        console.log("user logged in")
        const selected_txn = temp_usertxn.filter(txns => (txns.user_id === tmp_state.currentuser.id) && (txns.product_id === p_id) && (txns.cart_status === 'Remove from Cart'));
        console.log("selected_txn", selected_txn)
        if (selected_txn.length === 0) {
            console.log("inside if loop of selected_txn", selected_txn)
            const maxId = temp_usertxn.length > 0 ? Math.max(...temp_usertxn.map(obj => obj.txn_id)) : 0;
            const txn_items = {
                txn_id: maxId + 1,
                user_id: tmp_state.currentuser.id,
                product_id: p_id,
                order_quantity: 1,
                cart_status: 'Remove from Cart',
                order_status: 'New'
            }
            const new_added_txns = [...tmp_state.usertxn, txn_items]
            const new_State = {
                ...tmp_state,
                usertxn: new_added_txns,
                cartcount: tmp_state.cartcount + 1
            }
            setcontextvalues(new_State)
            window.localStorage.setItem('shoppink-state', JSON.stringify(new_State))
            const saved_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
            console.log("context values from localstorage updated afted addtocart", saved_state);
        }
        else {
            console.log("inside else loop of selected_txn", selected_txn)

        }
    }

    else {
        alert("Please Login to add items to cart")
    }

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


export const incrementquantity = (setcontextvalues, p_id) => {
    console.log("increment")
    setcontextvalues(prevState => ({
        ...prevState,
        productitems: prevState.productitems.map(item => {
            if (item.product_id === p_id) {
                if (item.quantity >= 5) {
                    alert("Sorry, you have reached the maximum limit!");
                    return item;
                }

                const updatedQuantity = item.quantity + 1;
                const newStatus = updatedQuantity > 0 ? 'Remove from Cart' : item.p_status;

                return { ...item, quantity: updatedQuantity, p_status: newStatus };
            }
            return item;
        })
    }));
}

export const decrementquantity = (setcontextvalues, p_id) => {
    console.log("decrement")
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
    const user_txn = temp_state.usertxn
    const selected_txn_index = user_txn.findIndex(txn => txn.product_id === p_id);

    if (selected_txn_index !== -1) {
        const updated_txn = {
            ...user_txn[selected_txn_index], // Keep the existing properties
            order_quantity: user_txn[selected_txn_index].order_quantity > 0 ? user_txn[selected_txn_index].order_quantity - 1 : 0,
            cart_status: user_txn[selected_txn_index].order_quantity > 0 ? 'Add to Cart' : 'Remove from Cart'
        };
        console.log("updated txn after decrement", updated_txn)

        const updated_user_txn = user_txn.map((txn, index) => {
            return index === selected_txn_index ? updated_txn : txn;
        });

        const updated_state = {
            ...temp_state,
            usertxn: updated_user_txn
        };
        setcontextvalues(updated_state)
        window.localStorage.setItem('shoppink-state', JSON.stringify(updated_state));
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
        console.log("context values from localstorage updated in decrement quantity", saved_state);



    }
}


export const cartcountcalc = (contextvalues, setcontextvalues) => {
    const temp_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
    console.log("Cartcount calculation 1", temp_state.currentuser)
    console.log("Cartcount calculation 2", contextvalues.currentuser)
    console.log("Cartcount calculation 3", temp_state.usertxn)
    const current_cart_items = temp_state.usertxn.filter(txn => txn.cart_status === 'Remove from Cart');
    const cartvalues = {
        ...temp_state,
        cartcount: current_cart_items.length

    };
    setcontextvalues(cartvalues)
    console.log("updated cart count values", cartvalues)
    window.localStorage.setItem('shoppink-state', JSON.stringify(cartvalues))

}


export const carttotalvalue = (contextvalues, setcontextvalues) => {
    const inCartItems = contextvalues.productitems.filter(product => product.p_status === 'Remove from Cart');
    console.log("inCartItems", inCartItems)

    const totalvalue = inCartItems.reduce((total, product) => {
        const tempprice = parseInt(product.p_price.replace('$', ''));
        return total + (tempprice * product.quantity);
    }, 0);
    setcontextvalues(prev => ({ ...prev, totalcartvalue: totalvalue }))


}

/* Backend Data retrieval Functions */

export const loginfunc = async (values, contextvalues, setcontextvalues) => {
    try {
        console.log("insideloginfunc")
        const response = await httpclient.get('signup');
        const users = response.data; // Define users with `const`
        console.log("users", users);

        // Find the user based on the provided email
        const userFound = users.find(user => user.email === values.email);
        console.log("userfound", userFound)
        if (!userFound) {
            console.log("User not Found");
            return [1, userFound.id];
        }
        else if (userFound.password === values.password) {
            console.log("Password matched");
            console.log("Context values into cartutils", contextvalues)
            const res = await httpclient.get('txns');
            const usr_txns = res.data;
            console.log("usr_txn", usr_txns);
            const currentuser_txn = usr_txns.filter(txn => txn.user_id === userFound.id);
            const updatedDefaultValues = {
                ...contextvalues,
                users: users,
                currentuser: userFound,
                isloggedin: true,
                currentTime: new Date().toLocaleTimeString(),
                usertxn: currentuser_txn
            };
            setcontextvalues(updatedDefaultValues);
            console.log("Setting updated default value in cartutil", updatedDefaultValues)
            window.localStorage.setItem('shoppink-state', JSON.stringify(updatedDefaultValues))
            //const saved_state = window.localStorage.getItem('shoppink-state');
            const saved_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
            console.log("context values from localstorage updated in cartutils", saved_state);
            cartcountcalc(contextvalues, setcontextvalues)


            return [2, userFound.id];
        } else {
            console.log("Invalid Password");
            return [0, userFound.id];
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