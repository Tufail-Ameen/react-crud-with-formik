import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Slice/RegisterFormSlice";


const store = configureStore({
    reducer: {
        register: registerReducer,
    },
});


export default store;