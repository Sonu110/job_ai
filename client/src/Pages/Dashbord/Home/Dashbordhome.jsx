import React from 'react'
import Dashbordnavbar from '../components/Navbar'
import Sidemenu from '../components/Sidemenu'
import { Navigate, Outlet } from 'react-router-dom'



function Dashbordhome({auth}) {
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

export default Dashbordhome