import httpclient from './Axios';


export const handleproductsdesc = (setcontextvalues, p_id, navigate) => {

    setcontextvalues(prev => ({
        ...prev, productsdesc: true, currentpid: p_id
    }))
    navigate(`/productsdesc/${p_id}`);

}


export const addtocart = (setcontextvalues, p_id) => {
    /*const tmp_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
    const temp_usertxn = tmp_state.usertxn
    const prd_items=tmp_state.productitems
    if (tmp_state.isloggedin) {
        const selected_txn =temp_usertxn.filter(txns => (txns.user_id === currentuser.id) && txns.product_id=== p_id);
        if(selected_txn){
            const txn_items = {
                ...temp_usertxn,
                user_id:tmp_state.currentuser.id,
                product_id: p_id,
                order_quantity:1,
                cart_status:'Remove from Cart',
                order_status:'New'
            }
            const new_State={
                ...tmp_state,
                usertxn:temp_usertxn
            }
            setcontextvalues(new_State)

                    }
    
                    const updatedQuantity = item.quantity + 1;
                    const newStatus = updatedQuantity > 0 ? 'Remove from Cart' : item.p_status;
    
                    return { ...item, quantity: updatedQuantity, p_status: newStatus };
                }
                return item;
           
        }
                const newStatus = item.cart_status === 'Add to Cart' ? 'Remove from Cart' : 'Add to Cart';
                console.log("inside addtocart function in cartutils");
                console.log("items", item.product_id);
                console.log("newStatus", newStatus);

                return {
                    ...item,
                    cart_status: newStatus,
                    order_quantity: newStatus !== 'Add to Cart' ? 1 : 0
                };
            }
            return item;
        });


        const txn_items = {
            ...tmp_state,
            usertxn: updatedUsertxn
        };

        setcontextvalues(txn_items)
        window.localStorage.setItem('shoppink-state', JSON.stringify(txn_items))
        console.log("added to cart", txn_items)
        const saved_state = JSON.parse(window.localStorage.getItem('shoppink-state'))
        console.log("context values from localstorage updated in addtocart", saved_state);
    }
    else {
        alert("Please Login to add items to cart")
    }*/

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
    console.log("increment")
    setcontextvalues(prevState => ({
        ...prevState,
        productitems: prevState.productitems.map(item => {
            if (item.product_id === p_id) {
                const newQuantity = item.quantity - 1;
                const updatedQuantity = newQuantity < 0 ? 0 : newQuantity;
                const newStatus = updatedQuantity === 0 ? 'Add to Cart' : item.p_status;

                return {
                    ...item,
                    quantity: updatedQuantity,
                    p_status: newStatus
                };
            }
            return item;
        })
    }));
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