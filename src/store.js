import { createStore } from 'redux';
import userReducer from './reducer';
const loadState = () => {
    try {
        const serializedState = window.localStorage.getItem('shoppink-store');
        if (serializedState === null) return undefined; // If nothing in local storage, return undefined
        return JSON.parse(serializedState); // Return the parsed state
    } catch (err) {
        console.error("Could not load state:", err);
        return undefined;
    }
};


const persistedState = loadState(); // Load the state from local storage
const store = createStore(userReducer, persistedState);


export default store;
