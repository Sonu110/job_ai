import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import Noprofile from '../../../components/Noprofile';
function Userprofilepage() {

    const [ userData , setuserprofiledata]= useState(null)
    const [loading , setLoading]= useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/userprofiledata`, {
                    method:"GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setuserprofiledata(data[0])
                    
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

console.log("userprofile data is ",  userData);


    return (
        <div>

{loading ? (
                <p>Loading...</p>
            ) : (
<div className="rounded-lg pt-24 bg-white border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
      {userData ? (
        <>
          <div className="flex flex-col space-y-1.5 p-6 pb-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">

                    <img
  className="h-8 w-auto"
  src={userData?.profilePicture}
  onError={(e) => {
    e.target.src = "https://source.unsplash.com/random";
  }}
  alt="Your Company"
/>

                    </span>
                  </span>
                  <div className="grid gap-0.5 text-sm">
                    <div className="font-bold">{userData.fullName}</div>
                    <div className="text-gray-500 dark:text-gray-400">{userData.jobTitle}</div>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                <span className=' text-white'><FaCheckCircle></FaCheckCircle></span>
                </button>
              </div>
              <div className="grid gap-0.5 text-sm">
                <div>
                  <span className="font-medium">Location: </span>
                  {userData.location}
                </div>
                <div>
                  <span className="font-medium">Rate: </span>${userData.rate} / hour
                </div>
                <div>
                  <span className="font-medium">Member Since: </span>{userData.createdAt}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">About {userData.fullName}</span>
              </div>
              <div>{userData.about}</div>
              <div>
                <span className="font-medium">Experience</span>
              </div>
              <div>
                <ul className="list-disc list-inside space-y-4 pl-4">
                  {userData.experienceList.map((exp, index) => (
                    <li key={index}>
                      <div>
                        <span className="font-semibold">{exp.title}</span> at {exp.company} ({exp.duration})
                      </div>
                      <div>{exp.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium">Education</span>
              </div>
              <div>
                <ul className="list-disc list-inside space-y-4 pl-4">
                  {userData.educationList.map((edu, index) => (
                    <li key={index}>
                      <div>
                        <span className="font-semibold">{edu.degree}</span> from {edu.school} ({edu.duration})
                      </div>
                      <div>{edu.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <a className="font-medium underline" href="#">
                Visit {userData.fullName}'s portfolio
              </a>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Contact</span>
                </div>
                <div>{userData.contactEmail}</div>
                <div>{userData.contactPhone}</div>
              </div>
            </div>
          </div>
        </>
      ):
      <Noprofile></Noprofile>
      }
    </div>

)}

        </div>
    )
}

export default Userprofilepage