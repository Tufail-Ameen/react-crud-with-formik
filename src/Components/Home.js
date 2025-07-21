import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Home(props) {
    let [formData, setFormData] = useState([]);            //for show data
    let [editingIndex, setEditingIndex] = useState(-1);    //for edit
    let [ButtonUpdate, setButtonUpdate] = useState("");    //for button text update
    let [editid, setEditId] = useState("");                //for update API
    let navigate = useNavigate();
    const editUserData = formData[editingIndex];

    const logoutbtn = () => {
        navigate("/")
    }

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((response) => {
                setFormData(response.data);
            });
    }, []);

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

                setTimeout(() => {
                    toast.success("Delete Successfully");
                }, 700);

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // toast.success("Cancel Successfully");
            }
        });
    };

    const handeleditbtn = (index, id) => {
        setEditId(id);
        setEditingIndex(index);
        setButtonUpdate("Update")
    };

    const initialValues = {
        firstName: editUserData ? editUserData.firstName : "",
        lastName: editUserData ? editUserData.lastName : "",
        gender: editUserData ? editUserData.gender : "Male",
        language: editUserData ? editUserData.language : [],
        email: editUserData ? editUserData.email : "",
        phoneNo: editUserData ? editUserData.phoneNo : "",
        city: editUserData ? editUserData.city : "",
        password: editUserData ? editUserData.password : "",
        description: editUserData ? editUserData.description : ""
    };

    const validationSchema = Yup.object({
    });


    const onSubmit = (values, { resetForm }) => {

        const emailExists = formData.some(data => data.email === values.email);

        let mydata = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            language: values.language,
            email: values.email,
            phoneNo: values.phoneNo,
            city: values.city,
            password: values.password,
            description: values.description
        };
        if (editingIndex !== -1) {
            // Patch API
            axios.patch(`http://localhost:3000/users/${editid}`, mydata)
                .then(response => {
                    // console.log("Data Update Successfully")
                })

        }
        else if (!emailExists) {
            // POST API
            axios.post("http://localhost:3000/users", mydata)
                .then(response => {
                    resetForm();
                })

        } else {
            // toast.warning("Email already exists, enter a different email.");
        }
        setTimeout(() => {
            axios.get("http://localhost:3000/users")
                .then((response) => {
                    setFormData(response.data);
                });
        }, 1000);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ values, handleSubmit, handleChange }) => (<Form>
                    <div className='container' >

                        {/* Heading */}
                        <h1 className='text-center'> User Data </h1>

                        {/* Row 1 */}
                        <div className='row mt-3 pt-3'>
                            <div className='col-3' ></div>
                            <div className='col-6 border p-3'>
                                {/* Row */}
                                <div className='row' >
                                    <div className='col-6' >
                                        {/* 1st input */}
                                        <div>
                                            <label htmlFor="exampleFormControlInput1" className="form-label">First Name:</label>
                                            <Field type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter First Name" name='firstName' />
                                        </div>

                                        <ErrorMessage name="firstName" component="div"
                                            className="text-danger fw-bold" /></div>

                                    <div className='col-6' >
                                        {/* 2nd input */}
                                        <div>
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Last Name:</label>
                                            <Field type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Last Name" name='lastName' />
                                        </div>

                                        <ErrorMessage name="lastName" component="div"
                                            className="text-danger fw-bold" /></div>
                                </div>

                                {/* Row */}
                                <div className='row' >

                                    <div className='col-6' >
                                        {/* 3rd input */}
                                        <label>Gender:</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="flexRadioDefault1"
                                                value="Male"
                                                checked={values.gender === 'Male'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label setfont" htmlFor="flexRadioDefault1">
                                                Male
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="flexRadioDefault2"
                                                value="Female"
                                                checked={values.gender === 'Female'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label setfont" htmlFor="flexRadioDefault2">
                                                Female
                                            </label>
                                        </div>
                                    </div>

                                    <div className='col-6' >
                                        {/* 4th input */}
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Select Language:
                                        </label>

                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" value="English" id="flexCheckDefault" name='language' />
                                            <label className="form-check-label setfont" htmlFor="flexCheckDefault">
                                                English
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" value="Spanish" id="flexCheckDefault" name='language' />
                                            <label className="form-check-label setfont" htmlFor="flexCheckDefault">
                                                Spanish
                                            </label>
                                        </div>
                                        <ErrorMessage name="language" component="div"
                                            className="text-danger fw-bold" />
                                    </div>

                                </div>


                                <div className='row' >
                                    <div className='col-6' >
                                        {/* 5th input */}
                                        <div className="">
                                            <label htmlFor="exampleFormControlInput1" className="form-label ">Email:</label>
                                            <Field type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" name='email' />
                                        </div>

                                        <ErrorMessage name="email" component="div"
                                            className="text-danger fw-bold" />
                                    </div>

                                    <div className='col-6' >
                                        {/* 6th input */}
                                        <div className="">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Phone No:</label>
                                            <Field type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Phone no" name='phoneNo' />
                                        </div>

                                        <ErrorMessage name="phoneNo" component="div"
                                            className="text-danger fw-bold" />
                                    </div>
                                </div>

                                <div className='row' >

                                    <div className='col-6' >
                                        {/* 7th input */}
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Select City:</label>
                                        <Field as="select" className="form-select" aria-label="Default select example" name="city">
                                            {/* <option selected>Select City</option> */}
                                            <option value="Karachi">Karachi</option>
                                            <option value="Islamabad">Islamabad</option>
                                            <option value="Peshawar">Peshawar</option>
                                            <option value="Faisalabad">Faisalabad</option>
                                            <option value="Lahore">Lahore</option>
                                        </Field>

                                        <ErrorMessage name="city" component="div"
                                            className="text-danger fw-bold" />
                                    </div>

                                    <div className='col-6'>
                                        {/* 8th input */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Password:</label>
                                            <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                                            <Field type="text" className="form-control" id="exampleFormControlInput1" name='password' ></Field>

                                            <ErrorMessage name="password" component="div"
                                                className="text-danger fw-bold" />
                                        </div>
                                    </div>

                                </div>

                                <div className='row' >
                                    <div className='col-6' >
                                        {/* 9th input */}
                                        <div className="">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description:  </label>
                                            <Field as="textarea" className="form-control" name="description:" id="exampleFormControlTextarea1" placeholder="Describe yourself here" rows="3"></Field>
                                        </div>
                                    </div>
                                </div>

                                <div className='row' >
                                    <div className='col-6'>
                                        {/* Submit Button */}
                                        <button type="submit" className="btn btn-primary mt-2 m-2">
                                            {ButtonUpdate || "Submit"}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Row 2 */}
                        <div className='row' >
                            <div className='col-12' >
                                <table id='table' className="table table-striped m-3 p-3 ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone no</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Option</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {formData.map((data, index) => (
                                            <tr key={index}>
                                                <td scope="col">{data.firstName} {data.lastName}</td>
                                                <td scope="col">{data.gender}</td>
                                                <td scope="col">{data.email}</td>
                                                <td scope="col">{data.phoneNo}</td>
                                                <td scope="col">{data.city}</td>
                                                <td scope="col">{data.password}</td>
                                                <td scope="col">{data.language.join(', ')}</td>
                                                <td scope="col">
                                                    <button onClick={() => handeldeletebtn(data.id)} type="button" className="btn btn-danger mx-2">Delete</button>
                                                    <button onClick={() => handeleditbtn(index, data.id)} type="button" className="btn btn-warning">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Logout Button */}
                                <button onClick={logoutbtn} id='btn' type="button" className="btn btn-primary">Logout</button>
                            </div>
                        </div>
                        {/* Container end */}
                    </div>
                </Form>)}
            </Formik>
        </>
    )
}