import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';



import PatientLogin from '../PatientLogin';
import DoctorLogin from '../DoctorLogin';
import HospitalLogin from '../HospitalLogin';
import PatientSignup from '../PatientSignup';
import DoctorSignup from '../DoctorSignup';
import HospitalSignup from '../HospitalSignup';
import AllDoc from '../AllDoc';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/patient/signup' element={<PatientSignup/>}/>
        <Route path='/patient/login' element={<PatientLogin/>} />
        <Route path='/doctor/signup' element={<DoctorSignup/>} />
        <Route path='/doctor/login' element={<DoctorLogin/>} />
        <Route path='/hospital/signup' element={<HospitalSignup/>} />
        <Route path='/hospital/login' element={<HospitalLogin/>} />
        <Route path='/alldoctors' element={<AllDoc/>} />

      </Routes>
    </div>
  )
}

export default AllRoutes