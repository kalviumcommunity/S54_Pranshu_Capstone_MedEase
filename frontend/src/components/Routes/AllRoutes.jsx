import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Test from '../Test';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes