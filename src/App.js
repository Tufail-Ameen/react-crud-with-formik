import React, { useState } from 'react'
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
  import "./App.css";
import Home from './Components/Home';

export default function App() {

  let [formdata, setFormData] = useState();

  const onsubmit = (data) => {
    // console.log("obj", data)
    setFormData(data);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm flow1={onsubmit} />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/Home" element={<Home data={formdata} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
