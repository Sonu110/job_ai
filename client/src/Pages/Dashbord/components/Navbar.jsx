import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.svg'

import { useContext } from "react";
import { MyContext } from "../../../context/context";

import io from 'socket.io-client';


const Dashbordnavbar = () => {
  const location = useLocation();
 const{data, userdata , logout ,post ,jobCount, setJobCount}= useContext(MyContext)
 const [socket, setSocket] = useState(null);
 const [show, setShow] = useState(false);
 const [profile, setProfile] = useState(false);
 const [scrollPosition, setScrollPosition] = useState(0);

 console.log(jobCount);
 
 const toggleMenu = () => {
  setShow(!show);
 
};

const handleLogout = () => {

 const see= window.confirm("are you want to logout")
 if( see)
 {

   logout();
 }  


};

const handleScroll = () => {
  const position = window.scrollY;
  console.log('Scroll Position:', position); // Log scroll position
  setScrollPosition(position);
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


useEffect(() => {
  if (userdata && (post || data)) {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    
    socket.emit('joinCompanyRoom', { companyId: userdata.data?._id });

    socket.on('jobCountUpdated', ({ count }) => {
      console.log('Job count updated:', count);
      setJobCount(count);
    });

    socket.emit('joinCompanyRoom', { companyId: userdata.data?._id });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

  

    return () => {
      socket.disconnect();
    };
  }
}, [userdata]);



  return (
    <>
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${location.pathname === "/" ? (scrollPosition > 50 ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-white shadow-md'}`}>

  <div class="mx-auto  px-5 sm:px-7 lg:px-10  p-1 ">
    <div class="relative flex h-16 items-center justify-between  ">
      <div class="absolute inset-y-0 left-0 flex justify-between items-center sm:hidden">
      
        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={toggleMenu}>
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>


      </div>
      <div class="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-between">
        <div class="flex flex-shrink-0 items-center ">
          <img class="h-8 w-auto" src={logo} alt="Your Company"/>
          
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <Link to={'/'} class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" >Home</Link>



    

            {
  data || post ? (
    userdata && userdata.data && userdata.data.catagory === 'job_seeker' ? (
      <Link to={'/getjobs'} className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Find job</Link>
    ) : (
      <Link to={'/postjob'} className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Post jobs</Link>
    )
  ) : null
}


            <Link  to={'/contact'} class=" hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact  us</Link>
            {
              data  || post? 
              null
           
              :  <Link to={'/login'} class=" bg-blue-700 hover:bg-blue-600  text-white rounded-md px-3 py-2 text-sm font-medium">Login</Link>
          }
          </div>
        </div>
      </div>

      {

data  ? 

     
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
        <Link to={`/getjobs/notifation/${userdata.data?._id}`}>

        <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span class="absolute -inset-1.5"></span>
        <span className=" absolute bg-blue-900 w-5 h-5  text-sm  left-0 m-5 text-white  rounded-3xl -mt-2 ">{jobCount}</span>
          <span class="sr-only">View notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
        </Link>





 <div class="relative ml-8">
          <div>
            <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 " id="user-menu-button" aria-expanded="false" aria-haspopup="true"
            
            onClick={()=> setProfile(!profile)}
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <div className=" w-10" >

              <img
             
  src={`${import.meta.env.VITE_API_URL}/${userdata.data?.file}`}
  alt="User"
  onError={(e) => {
    console.error('Error loading image:', e);
  }}
  className=" h-12 rounded-2xl w-12"
/>
  </div>
            </button>
          </div>

        
          <div class={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ${profile ? 'block':"hidden"}   `} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <Link to={'/profile'} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>

            {
               userdata && userdata.data && userdata.data.catagory === 'job_seeker'   ?
               
               <Link  to={`/getjobs/alljjobapplied/${userdata.data?._id}`} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Job  Applied</Link>
               :
               <Link  to={`/postjob/Allcandidateform/${userdata.data?._id}`} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Job creation</Link>

            }
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={handleLogout}>Sign out</a>
          </div>
        </div>
      </div>
: post ?
(



<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
<Link to={`/postjob/notifation/${userdata.data?._id}`}>

<button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  <span class="absolute -inset-1.5"></span>
<span className=" absolute bg-blue-900 w-5 h-5  text-sm  left-0 m-5 text-white  rounded-3xl -mt-2 ">{jobCount}</span>
  <span class="sr-only">View notifications</span>
  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
</button>
</Link>





<div class="relative ml-8">
  <div>
    <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 " id="user-menu-button" aria-expanded="false" aria-haspopup="true"
    
    onClick={()=> setProfile(!profile)}
    >
      <span class="absolute -inset-1.5"></span>
      <span class="sr-only">Open user menu</span>
      <div className=" w-10" >

      <img
     
src={`${import.meta.env.VITE_API_URL}/${userdata.data?.file}`}
alt="User"
onError={(e) => {
console.error('Error loading image:', e);
}}
className=" h-12 rounded-2xl w-12"
/>
</div>
    </button>
  </div>


  <div class={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ${profile ? 'block':"hidden"}   `} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
    <Link to={'/profile'} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>

    {
       userdata && userdata.data && userdata.data.catagory === 'job_seeker'   ?
       
       <Link  to={`/getjobs/alljjobapplied/${userdata.data?._id}`} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Job  Applied</Link>
       :
       <Link  to={`/postjob/Allcandidateform/${userdata.data?._id}`} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Job creation</Link>

    }
    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" onClick={handleLogout}>Sign out</a>
  </div>
</div>
</div>
):
null
}







    </div>
  </div>

  <div class={`sm:hidden ${!show ?"hidden":"block"} bg-white` }    id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <Link to={'/'} class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
      <Link to={'/contact'} class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact</Link>
      <Link to={'/login'} class=" hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
    </div>
  </div>



</nav>

    </>
  );
};

export default Dashbordnavbar;
