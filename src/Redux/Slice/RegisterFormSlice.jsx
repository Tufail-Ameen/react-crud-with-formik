import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    firstName: "",
    lastName: "",
    gender: "Male",
    language: [],
    email: "",
    phoneNo: "",
    city: "",
    password: "",
    description: ""
}

const RegisterFormSlice = createSlice({
    name: "register",
    initialValues,
    reducers: {
        registerData: (state) => {
            console.log(state.initialValues);
        },
    },
});


export const { registerData } = RegisterFormSlice.actions
export default RegisterFormSlice.reducer;