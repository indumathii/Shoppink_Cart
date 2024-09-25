import httpclient from './Axios';
//export const handleproductsdesc = (setproductsdesc, p_id, navigate, setcurrentpid)
export const handleproductsdesc = (setcontextvalues, p_id, navigate) => {

    setcontextvalues(prev => ({
        ...prev, productsdesc: true, currentpid: p_id
    }))
    navigate(`/productsdesc/${p_id}`);

}

//export const addtocart = ( setproductitems, p_id) => {
export const addtocart = (setcontextvalues, p_id) => {
    setcontextvalues(prevState => ({
        ...prevState,
        productitems: prevState.productitems.map(item => {
            if (item.product_id === p_id) {
                const newStatus = item.cart_status === 'Add to Cart' ? 'Remove from Cart' : 'Add to Cart';
                console.log("inside addtocart function in cartutils")
                console.log("items", item.product_id)
                console.log("newStatus", newStatus)
                return {
                    ...item,
                    cart_status: newStatus,
                    quantity: newStatus !== 'Add to Cart' ? 1 : 0
                };
            }
            return item;
        })
    })

    );
}
//export const emptycart = (productitems, setproductitems) => {
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


//export const orderplaced = (productitems, setproductitems) => {
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

//export const incrementquantity = (productitems, setproductitems, p_id) => 
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
//export const decrementquantity = (productitems, setproductitems, p_id) =>
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

//export const cartcountcalc = (productitems, cartcount, setcartcount) => {
export const cartcountcalc = (contextvalues, setcontextvalues) => {
    console.log(contextvalues.productitems)
    const inCartItems = contextvalues.productitems.filter(product => product.p_status === 'Remove from Cart');
    console.log("inCartItems", inCartItems)
    setcontextvalues(prev => ({ ...prev, cartcount: inCartItems.length }))

}

//export const carttotalvalue = (productitems, settotalcartvalue) => {
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
//export const loginfunc = async (values, users, currentuser, setcurrentuser, setusers) => {
export const loginfunc = async (values, contextvalues, setcontextvalues) => {
    try {
        console.log("insideloginfunc")
        const response = await httpclient.get('signup');
        const users = response.data; // Define users with `const`
        console.log("users", users);

        // Find the user based on the provided email
        const userFound = users.find(user => user.email === values.email);

        // Update context with users and the found user
        setcontextvalues(prev => {
            const newContext = { ...prev, users: users, currentuser: userFound };
            console.log("Updated currentuser", newContext.currentuser); // Log updated user
            return newContext;
        });

        // Check if the user was found
        if (!userFound) {
            console.log("User not Found");
            return 1;
        } else if (userFound.password === values.password) {
            console.log("Password matched");
            console.log(contextvalues.currentuser.firstname)
            return 2;
        } else {
            console.log("Invalid Password");
            return 0;
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