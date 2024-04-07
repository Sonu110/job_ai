import React from 'react'
import Dashbordnavbar from '../components/Navbar'
import Sidemenu from '../components/Usermenuside'
import { Navigate, Outlet } from 'react-router-dom'



function Userdashbordhome({auth}) {
  if (!auth) {
    // Redirect to login page if not authenticated
    return <Navigate to={'/login'} />;
  }
  return (
    <div>
       <Dashbordnavbar></Dashbordnavbar>
        <Sidemenu></Sidemenu>
        <div className=" sm:ml-64  bg-back"> {/* Adjust margin-left to accommodate the sidebar width */}
        <Outlet />
      </div>
    </div>
  )
}

export default Userdashbordhome