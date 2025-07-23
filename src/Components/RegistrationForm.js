import { useState } from 'react';
import { useEffect } from 'react';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerData, initialState as initialValues } from '../Redux/Slice/RegisterFormSlice';


export default function Foam() {
    let [formData, setFormData] = useState([]);            //for show data
    let [editingIndex, setEditingIndex] = useState(-1);    //for edit
    let [ButtonUpdate, setButtonUpdate] = useState("");    //for button text update
    let [editid, setEditId] = useState("");                //for update API

    const dispatch = useDispatch()

    // Get API
    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((response) => {
                setFormData(response.data);
            });
    }, []);

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('First name is required')
            .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),

        lastName: Yup.string()
            .required('Last name is required')
            .matches(/^[A-Za-z]+$/, 'Only alphabetic characters are allowed'),

        language: Yup.array()
            .min(1, 'Select at least one option'),

        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),

        phoneNo: Yup.string()
            .required('Phone No is required')
            .test('phone-number', 'Phone number must be 11 digits', value => {
                if (!value) return false;
                return /^\d{11}$/.test(value);
            }),

        city: Yup.string()
            .required("Select at least one option"),

        password: Yup.string()
            .required("password is required")
    });

    const onSubmit = (values, { resetForm }) => {
        console.log("onsubmit", values);
        dispatch(registerData(values));

        // navigate("/")
        // const emailExists = formData.some(data => data.email === values.email);

        // let mydata = {
        //     firstName: values.firstName,
        //     lastName: values.lastName,
        //     gender: values.gender,
        //     language: values.language,
        //     email: values.email,
        //     phoneNo: values.phoneNo,
        //     city: values.city,
        //     password: values.password,
        //     description: values.description
        // };
        // if (editingIndex !== -1) {
        //     // Patch API
        //     axios.patch(`http://localhost:3000/users/${editid}`, mydata)
        //         .then(response => {
        //             // console.log("Data Update Successfully")
        //         })

        // }
        // else if (!emailExists) {
        //     // POST API
        //     axios.post("http://localhost:3000/users", mydata)
        //         .then(response => {
        //             toast.success("Register Successfully!");
        //             resetForm();
        //         })

        // } else {
        //     toast.warning("Email already exists, enter a different email.");
        // }
        // setTimeout(() => {
        //     axios.get("http://localhost:3000/users")
        //         .then((response) => {
        //             setFormData(response.data);
        //         });
        // }, 1000);
    };

    const handeldeletebtn = (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // delete API
                axios.delete(`http://localhost:3000/users/${id}`)
                setTimeout(() => {
                    axios.get("http://localhost:3000/users")
                        .then((response) => {
                            setFormData(response.data);
                        });
                }, 1000);

                toast.success("Deleted Successfully");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                toast.success("Cancel Successfully");
            }
        });
    };

    const handeleditbtn = (index, id) => {
        setEditId(id);
        setEditingIndex(index);
        setButtonUpdate("Update")
    };

    let navigate = useNavigate();

    return (
        <>
            <Formik
                // initialValues={editingIndex === -1 ? initialValues : formData[editingIndex]}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form>
                        <div className='container-fluid border'>
                            {/* Foam */}
                            <div className='row mt-3 pt-3 border'>
                                <div className='col-3'></div>
                                <div className='col-6 border p-3'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div>
                                                <label htmlFor="exampleFormControlInput1" className="form-label">First Name:</label>
                                                <Field type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" name='firstName' />
                                            </div>
                                            <ErrorMessage name="firstName" component="div" className="text-danger fw-bold" />
                                        </div>
                                        <div className='col-6'>
                                            <div>
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Last Name:</label>
                                                <Field type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Last Name" name='lastName' />
                                            </div>
                                            <ErrorMessage name="lastName" component="div" className="text-danger fw-bold" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Gender:</label>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Male" checked={values.gender === 'Male'} onChange={handleChange} />
                                                <label className="form-check-label setfont" htmlFor="flexRadioDefault1">Male</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="Female" checked={values.gender === 'Female'} onChange={handleChange} />
                                                <label className="form-check-label setfont" htmlFor="flexRadioDefault2">Female</label>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Select Language:</label>
                                            <div className="form-check">
                                                <Field className="form-check-input" type="checkbox" value="English" id="flexCheckDefault" name='language' />
                                                <label className="form-check-label setfont" htmlFor="flexCheckDefault">English</label>
                                            </div>
                                            <div className="form-check">
                                                <Field className="form-check-input" type="checkbox" value="Spanish" id="flexCheckDefault" name='language' />
                                                <label className="form-check-label setfont" htmlFor="flexCheckDefault">Spanish</label>
                                            </div>
                                            <ErrorMessage name="language" component="div" className="text-danger fw-bold" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="">
                                                <label htmlFor="exampleFormControlInput1" className="form-label ">Email:</label>
                                                <Field type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" name='email' />
                                            </div>
                                            <ErrorMessage name="email" component="div" className="text-danger fw-bold" />
                                        </div>
                                        <div className='col-6'>
                                            <div className="">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Phone No:</label>
                                                <Field type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Phone no" name='phoneNo' />
                                            </div>
                                            <ErrorMessage name="phoneNo" component="div" className="text-danger fw-bold" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Select City:</label>
                                            <Field as="select" className="form-select" aria-label="Default select example" name="city">
                                                <option value="Karachi">Karachi</option>
                                                <option value="Islamabad">Islamabad</option>
                                                <option value="Peshawar">Peshawar</option>
                                                <option value="Faisalabad">Faisalabad</option>
                                                <option value="Lahore">Lahore</option>
                                            </Field>
                                            <ErrorMessage name="city" component="div" className="text-danger fw-bold" />
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Password:</label>
                                                <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                                                <Field type="text" className="form-control" id="exampleFormControlInput1" name='password'></Field>
                                                <ErrorMessage name="password" component="div" className="text-danger fw-bold" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description:  </label>
                                                <Field as="textarea" className="form-control" name="description:" id="exampleFormControlTextarea1" placeholder="Describe yourself here" rows="3"></Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Link to="/">Already have an account</Link>
                                            <button type="submit" className="btn btn-primary mt-2 m-2">{ButtonUpdate || "Submit"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Table */}
                            <div className='row border'>
                                <div className='col-12'>
                                    <div className="table-responsive">
                                        <table id='table' className="table table-striped m-3 p-3 ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">Language</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone no</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.firstName} {data.lastName}</td>
                                                        <td>{data.gender}</td>
                                                        <td>{data.language.join(', ')}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.phoneNo}</td>
                                                        <td>{data.city}</td>
                                                        <td>
                                                            <button onClick={() => handeldeletebtn(data.id)} type="button" className="btn btn-danger mx-2">Delete</button>
                                                            <button onClick={() => handeleditbtn(index, data.id)} type="button" className="btn btn-warning">Edit</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
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
    )
}
