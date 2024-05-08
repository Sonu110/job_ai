import React, { useState } from 'react';
import Home from "./Pages/Home/Home";
import './App.css';
import Signup from "./Pages/Auth/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Findjobhome from "./Pages/jobget/Home";
import Findjobprotected from "./Pages/Protected/findjob";
import { useContext } from "react";
import { MyContext } from "./context/context";
import Layout from "./Pages/Layout/Layout";
import PostJobForm from "./Pages/Postjob/PostJobForm";
import Conatctform from "./Pages/Conatctform";
import Relatedjobreult from "./Pages/jobget/Relatedjobreult";
import JobApplyForm from "./Pages/jobget/JobApplyForm";
import Jobactivety from "./Pages/jobget/Jobactivety";
import Allcandidateform from "./Pages/Postjob/Allcandidateform";
import Notifation from "./Pages/Postjob/Notifation";
import Notification from './Pages/jobget/Notifation';
import Dashbordhome from './Pages/Dashbord/Home/Dashbordhome';
import Dashboardhomepage from './Pages/Dashbord/Pages/Dashboardhomepage';
import Companyprofile from './Pages/Dashbord/Pages/Companyprofile';
import PostJobfrom from './Pages/Dashbord/Pages/PostJobfrom';
import Managejobdata from './Pages/Dashbord/Pages/Managejobdata';
import Allapplicationdata from './Pages/Dashbord/Pages/Allapplicationdata';
import Livejobalertpage from './Pages/Dashbord/Pages/Livejobalertpage';
import Userdashbordhome from './Pages/Userdashboard/Home/Userdashbordhome';
import UserDashboardhomepage from './Pages/Userdashboard/Pages/Userdashboardhomepage';
import Massgae from './Pages/Userdashboard/Pages/Massgae';
import Userprofilepage from './Pages/Userdashboard/Pages/Userprofilepage';
import Error404 from './Pages/Error404';
import JobProfileForm from './Pages/Userdashboard/Pages/JobProfileForm';
import Bookmarkedpage from './Pages/Userdashboard/Pages/Bookmarkedpage';
import Shortlistjobs from './Pages/Userdashboard/Pages/Shortlistjobs';
import JobProfilupdateform from './Pages/Userdashboard/Pages/JobProfilupdateform';
import Companyprofileupdate from './Pages/Dashbord/Pages/Companyprofileupdate';
import Companyprofiepage from './Pages/Dashbord/Pages/Companyprofiepage';


function App() {
  const { data, post } = useContext(MyContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout></Layout>}  >
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/siginup" element={<Signup></Signup>}></Route>
          <Route path="/contact" element={<Conatctform></Conatctform>}></Route>
          <Route path="/getjobs" element={<Findjobprotected user={data}></Findjobprotected>} >
            <Route path="" element={<Findjobhome />} />
            <Route path="alljjobapplied/:id" element={<Jobactivety />} />
            <Route path="apply/:id" element={<JobApplyForm></JobApplyForm>}></Route>
            <Route path=":id" element={<Relatedjobreult></Relatedjobreult>}></Route>
            <Route path="notifation/:id" element={<Notification/>}></Route>
          </Route>
         
          <Route path="/postjob" element={<Findjobprotected user={post}  ></Findjobprotected>} >
            <Route path="" element={<PostJobForm />} />
            <Route path="Allcandidateform/:id" element={<Allcandidateform></Allcandidateform>}></Route>
            <Route path="notifation/:id" element={<Notifation/>}></Route>
            
          </Route>


        </Route>

        <Route path='/companydashboard'  element={<Dashbordhome auth ={post}/>}>
        <Route index element={<Dashboardhomepage/>}></Route>
        <Route path='create-profile' element={<Companyprofile/>}></Route>
        


        <Route path='company-profile' element={<Companyprofiepage></Companyprofiepage>}></Route>
        <Route path='update-profile' element={<Companyprofileupdate/>}></Route>
        <Route path='comapny' element={<Companyprofileupdate/>}></Route>
          
          <Route path='post-new-job' element={<PostJobfrom/>}></Route>
          <Route path='manage-jobs' element={<Managejobdata></Managejobdata>}></Route>
          <Route path='all-applicants' element={<Allcandidateform/>}></Route>
          <Route path='shortlisted-resumes' element={<Allapplicationdata/>}></Route>
          <Route path='alerts' element={<Livejobalertpage/>}></Route>
          
        </Route>


        <Route path='/userdashboard'  element={<Userdashbordhome auth={data}/>}>
        <Route index element={<UserDashboardhomepage/>}></Route>
        <Route path='my-profile' element={<Userprofilepage/>}></Route>
        <Route path='create-profile' element={<JobProfileForm/>}></Route>
    
        <Route path='update-profile' element={<JobProfilupdateform/>}></Route>
       
        <Route path="applied-jobs" element={<Jobactivety />} />
      
        <Route path="selected-applications" element={<Shortlistjobs/>} />
         
        <Route path='alerts' element={<Notification/>}></Route>
          
          <Route path='bookmarked' element={<Bookmarkedpage></Bookmarkedpage>}></Route>

          <Route path='massage/:id' element={<Massgae/>}></Route>
          
          
          
        </Route>


        <Route path='*' element={<Error404></Error404>}></Route>

      </>
    )
  );

 
  return (
    <>
      <RouterProvider router={router} />
     
    </>
  );
}

export default App;
