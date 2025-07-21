import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function LoginForm(props) {
    let [formData, setFormData] = useState([]);
    let navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = (values) => {
        const isValidUser = formData.some(data => data.email === values.email && data.password === values.password
        );

        if (isValidUser) {
            const index = formData.findIndex(obj => obj.email === values.email)
            // console.log(formData[index])
            props.flow1(formData[index])
            toast("Login Successfully!");

            setTimeout(() => {
                navigate("/Home")
            }, 1000);
        }

        else {
            toast("Invalid Email and Password!");
        }
    };

    // Get API
    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((response) => {
                setFormData(response.data);
            });
    }, []);


    return (
        <>
            <div className='container'>
                <div className='row mt-5 pt-5'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <div className='col'>
                                    <h3>Login</h3>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize
                                >


                                    {({ values }) => (<Form>

                                        <div className='mb-3'>
                                            <Field
                                                type='email'
                                                name='email'
                                                className='form-control'
                                                placeholder='Email'
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-danger fw-bold" />

                                        </div>
                                        <div className='mb-3'>
                                            <Field
                                                type='text'
                                                name='password'
                                                className='form-control'
                                                placeholder='password'
                                            />
                                            <ErrorMessage
                                                name='password'
                                                component='div'
                                                className='text-danger fw-bold'
                                            />
                                        </div>
                                        <Link to="/RegistrationForm">Register yourself</Link>
                                        <button id='loginbtn' className='btn btn-primary' type='submit'>Log in</button>
                                    </Form>)}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            // theme="colored"
            />
        </>
    );
}
