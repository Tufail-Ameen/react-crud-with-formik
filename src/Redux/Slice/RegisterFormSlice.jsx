import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    firstName: "",
    lastName: "",
    gender: "Male",
    language: [],
    email: "",
    phoneNo: "",
    city: "",
    password: "",
    description: ""
};

const RegisterFormSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerData: (state, action) => {
            console.log("action.payload", action.payload);
            return { ...state, ...action.payload };
        },

    },
});


export const { registerData } = RegisterFormSlice.actions
export default RegisterFormSlice.reducer;